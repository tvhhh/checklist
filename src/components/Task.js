import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

import CheckButton from './CheckBox';
import Category from './Category';

import colors from '../styles/colors';

import { extractDateTime } from '../utils/DateTime';


export default class Task extends React.Component {
  render() {
    const extractedTime = extractDateTime(this.props.dueTime);
    return (
      <TouchableOpacity onPress={this.props.onSelect}>
        <View style={[styles.taskContainer, { opacity: (this.props.done) ? 0.5 : 1 }]}>
          <CheckButton name="done" checked={this.props.done} onPress={this.props.toggleDone} />
          <View style={styles.textContainer}>
            <Text style={styles.taskTitle}>{this.props.title}</Text>
            <Text style={styles.taskTime}>{`${extractedTime.date}  ${extractedTime.time}`}</Text>
          </View>
          <Category name={this.props.category} size={40} />
          <CheckButton name="pinned" checked={this.props.pinned} onPress={this.props.togglePinned} />
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    backgroundColor: colors.Overlay,
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    marginBottom: 5,
    borderRadius: 15,
  },
  textContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    color: colors.PrimaryText,
  },
  taskTime: {
    fontSize: 12,
    color: colors.SecondaryText,
  },
});
