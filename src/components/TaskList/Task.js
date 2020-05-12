import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckButton from '../CheckBox/index';
import styles from './styles';
import colors from '../../styles/colors';

export default class Task extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.task}>
        <CheckButton name="done" />
        <AntDesign 
          name="questioncircle"
          size={30}
        />
        <View style={styles.taskContent}>
          <Text style={styles.taskTitle}>{this.props.text}</Text>
          <Text style={styles.taskTime}>{this.props.time}</Text>
        </View>
        <CheckButton name="marked" />
      </TouchableOpacity>
    );
  }
};
