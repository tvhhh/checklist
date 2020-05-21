import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { getToDay } from '../../util/DateTime';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      today: getToDay(),
    }
  }

  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.time}>{this.state.today.date}</Text>
      </View>
    );
  }
};
