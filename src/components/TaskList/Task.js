import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import CheckButton from '../CheckBox/index';
import Category from '../Category/index';
import styles from './styles';
import { extractDateTime } from '../../util/DateTime';

export default class Task extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      dueTime: this.props.dueTime,
      category: this.props.category,
      done: false,
      pinned: false,
    }
  }

  render() {
    let extractedDateTime = extractDateTime(this.state.dueTime);
    const time = `${extractedDateTime.date}  ${extractedDateTime.time}`;
    return (
      <TouchableOpacity style={styles.task} onPress={this.props.onPress}>
        <CheckButton name="done" />
        <View style={styles.taskContent}>
          <Text style={styles.taskTitle}>{this.state.title}</Text>
          <Text style={styles.taskTime}>{time}</Text>
        </View>
        <Category name={this.props.category} size={40} />
        <CheckButton name="marked" />
      </TouchableOpacity>
    );
  }
};
