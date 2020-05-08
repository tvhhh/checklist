import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var getToDay = () => {
  let today = new Date();
  let day = DAYS[today.getDay()];
  let date = today.getDate();
  let month = MONTHS[today.getMonth()];
  let year = today.getFullYear();
  return `${day}, ${month} ${date}, ${year}`;
}

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
        <Text style={styles.time}>{this.state.today}</Text>
      </View>
    );
  }
};
