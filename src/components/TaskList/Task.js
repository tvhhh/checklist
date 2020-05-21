import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import CheckButton from '../CheckBox/index';
import styles from './styles';
import Category from '../Category/index';

export default class Task extends React.Component {
  render() {
    const time = `${this.props.pickedDate}, ${this.props.pickedTime}`;
    return (
      <TouchableOpacity style={styles.task}>
        <CheckButton name="done" />
        <View style={styles.taskContent}>
          <Text style={styles.taskTitle}>{this.props.title}</Text>
          <Text style={styles.taskTime}>{time}</Text>
        </View>
        <Category 
          name={this.props.category}
          size={30} 
        />
        <CheckButton name="marked" />
      </TouchableOpacity>
    );
  }
};
