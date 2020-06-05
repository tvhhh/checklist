import React from 'react';
import { SectionList, Text, View, } from 'react-native';
import Task from './Task';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { isToday } from '../../utils/DateTime';

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

  filterByDay = taskList => {
    return taskList.filter(task => isToday(task.dueTime)).reduce((obj, task) => {
      const title = "TODAY";
      return {
        ...obj, 
        [title]: [...(obj[title] || []), task],
      };
    }, {});
  }

  render() {
    const tasksToday = this.filterByDay(this.props.taskList);

    const sections = Object.keys(tasksToday).map(key => ({
      data: tasksToday[key],
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
