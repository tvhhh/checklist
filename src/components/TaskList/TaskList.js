import React from 'react';
import { SectionList, Text, View, } from 'react-native';
import Task from './Task';
import styles from './styles';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      taskList: props.taskList,
    };
  }

  render() {
    const sections = [{
      title: this.state.title,
      data: this.state.taskList,
    }];

    return (
      <View>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={obj => <Task {...(obj.item)} />}
          renderSectionHeader={obj => <Text style={styles.listTitle}>{obj.section.title}</Text>} 
        />
      </View>
    );
  }
};