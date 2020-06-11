import React from 'react';
import { SectionList, Text, View, } from 'react-native';
import Task from './Task';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { isToday, getWeekDates, getNameOfDay } from '../../utils/DateTime';

class EmptyComponent extends React.Component {
  render() {
    return (
      <View style={styles.emptyComponentContainer}>
        <Text style={{ color: "dimgrey", fontSize: 24 }}>You're all done now!</Text>
        <Text style={{ color: "dimgrey", fontSize: 16 }}>Tap + to create a new task</Text>
        <FontAwesome5 name="tasks" color="grey" size={40} />
      </View>
    );
  }
};

export default class TaskList extends React.Component {
  renderItem = ({ item }) => (
    <Task
      {...item}
      showStateOption={true}
      onSelect={() => this.props.onTaskSelect(item)}
    />
  )

  renderSectionHeader = ({ section }) => <Text style={styles.listTitle}>{section.title}</Text>

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

  filterByDay = taskList => {
    return taskList.filter(task => isToday(task.dueTime)).reduce((obj, task) => {
      const title = "TODAY";
      return {
        ...obj, 
        [title]: [...(obj[title] || []), task],
      };
    }, {});
  }

  filterByPinned = taskList => {
    return taskList.filter(task => task.pinned === true).reduce((obj, task) => {
      const title = "Important";
      return {
        ...obj,
        [title]: [...(obj[title] || []), task],  
      }
    }, {});
  }

  filterOption = (title, taskList) => {
    switch(title) {
      case "MY DAY":
        return this.filterByDay(taskList);
      case "MY WEEK":
        return this.filterByWeek(taskList);
      case "PINNED":
        return this.filterByPinned(taskList);
    }
    return [];
  }

  render() {
    const tasks = this.filterOption(this.props.title, this.props.taskList.sort((a,b) => a.dueTime - b.dueTime));

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
          ListEmptyComponent={<EmptyComponent />}
        />
      </>
    );
  }
};
