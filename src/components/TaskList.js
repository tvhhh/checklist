import React from 'react';
import { SectionList, StyleSheet, Text, View, } from 'react-native';
import { Overlay } from 'react-native-elements';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Task from './Task';
import TaskForm from './Form/TaskForm';
import { Create } from './Button';

import colors from '../styles/colors';

import { isToday, getWeekDates, getNameOfDay, extractDate } from '../utils/DateTime';


export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      selected: {},
    };
  }

  renderItem = ({ item }) => <Task {...item} onSelect={() => this.onSelectedTaskPress(item)} />

  renderSectionHeader = ({ section }) => <Text style={styles.listTitle}>{section.title}</Text>

  onAddButtonPress = () => {
    this.setState({ showForm: true });
  }

  onSelectedTaskPress = task => {
    this.setState({ showForm: true, selected: task });
  }

  onFormBackdropPress = () => {
    this.setState({ showForm: false, selected: {} });
  }

  handleFormSubmit = task => {
    this.setState({ showForm: false });
    if (Object.keys(this.state.selected).length) {
      this.props.onEditTask(task, this.state.selected);
    } else {
      this.props.onCreateTask(task);
    }
    this.setState({ selected: {} });
  }

  handleRemoval = () => {
    this.props.onRemoveTask(this.state.selected);
    this.setState({ showForm: false, selected: {} });
  }

  filterByToday = taskList => {
    return taskList.filter(task => isToday(task.dueTime)).reduce((obj, task) => {
      const title = "TODAY";
      return {
        ...obj,
        [title]: [...(obj[title] || []), task],
      };
    }, {});
  }

  filterByWeek = taskList => {
    let [start, end] = getWeekDates();

    return taskList.filter(task => task.dueTime <= end && task.dueTime >= start).reduce((obj, task) => {
      const title = getNameOfDay(task.dueTime);
      return {
        ...obj,
        [title]: [...(obj[title] || []), task],
      }
    }, {});
  }

  filterByPinned = taskList => {
    return taskList.filter(task => task.pinned).reduce((obj, task) => {
      const title = "IMPORTANT";
      return {
        ...obj,
        [title]: [...(obj[title] || []), task],  
      }
    }, {});
  }

  filterByDate = (taskList, date) => {
    return taskList.filter(task => extractDate(task.dueTime) === date).reduce((obj, task) => {
      const title = date;
      return {
        ...obj,
        [title]: [...(obj[title] || []), task],  
      }
    }, {});
  }

  filterOption = (title, taskList, date) => {
    switch(title) {
      case "MY DAY":
        return this.filterByToday(taskList);
      case "MY WEEK":
        return this.filterByWeek(taskList);
      case "PINNED":
        return this.filterByPinned(taskList);
      default:
        return this.filterByDate(taskList, date);
    }
  }

  render() {
    const tasks = this.filterOption(
      this.props.title,
      [...this.props.taskList].sort((a,b) => a.dueTime - b.dueTime),
      this.props.date,
    );

    const sections = Object.keys(tasks).map(key => ({
      data: tasks[key],
      title: key,
    }));

    return (
      <>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          ListEmptyComponent={this.props.calendarView ? null : (
            <View style={styles.emptyComponentContainer}>
              <Text style={styles.emptyComponentLargeText}>You're all done now!</Text>
              <Text style={styles.emptyComponentSmallText}>Tap + to create a new task</Text>
              <FontAwesome5 name="tasks" color="grey" size={40} />
            </View>
          )}
        />
        <Create
          position={{ position: "absolute", bottom: 15, right: 15, }}
          onPress={this.onAddButtonPress} 
        />
        <Overlay
          isVisible={this.state.showForm} 
          onBackdropPress={this.onFormBackdropPress}
          overlayStyle={[styles.taskForm, { height: Object.keys(this.state.selected).length ? 350 : 300 }]}
        >
          <TaskForm
            {...this.state.selected}
            isOnSelected={Object.keys(this.state.selected).length > 0} 
            onSubmit={this.handleFormSubmit}
            onRemove={this.handleRemoval}
          />
        </Overlay>
      </>
    );
  }
};

const styles = StyleSheet.create({
  listTitle: {
    color: colors.TitleText,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
  },
  emptyComponentContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 220,
  },
  emptyComponentLargeText: {
    color: colors.PrimaryText,
    fontSize: 24,
  },
  emptyComponentSmallText: {
    color: colors.SecondaryText,
    fontSize: 16,
  },
  taskForm: {
    padding: 0,
    borderRadius: 10,
  },
});
