import React from 'react';
import { SectionList, Text, View, } from 'react-native';
import Task from './Task';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { isToday } from '../../util/DateTime';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const tasksByDay = this.filterByDay(this.props.taskList);

    const sections = Object.keys(tasksByDay).map(key => ({
      data: tasksByDay[key],
      title: key,
    }));

    return (
      <>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={obj => <Task {...(obj.item)} />}
          renderSectionHeader={obj => <Text style={styles.listTitle}>{obj.section.title}</Text>}
          ListEmptyComponent={
            <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 180, paddingBottom: 180, }}>
              <Text style={{ color: "dimgrey", fontFamily: "notoserif", fontSize: 24 }}>What are you gonna do?</Text>
              <Text style={{ color: "dimgrey", fontFamily: "notoserif", fontSize: 18 }}>Tap + to create a new task</Text>
              <FontAwesome5 name="tasks" color="grey" size={50} />
            </View>
          }
        />
      </>
    );
  }
};
