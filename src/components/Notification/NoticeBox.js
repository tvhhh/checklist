import React from 'react';
import { SectionList, Text, } from 'react-native';
import Task from '../TaskList/Task';
import styles from './styles';

export default class TaskList extends React.Component {
  renderItem = ({ item }) => <Task {...item} />

  renderSectionHeader = ({ section }) => <Text style={styles.noticeHeader}>{section.title}</Text>

  render() {
    const sections = [{
      title: "NOTIFICATIONS",
      data: this.props.upcomingList,
    }];

    return (
      <>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader} 
        />
      </>
    );
  }
};
