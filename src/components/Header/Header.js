import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { getToday, extractDateTime } from '../../utils/DateTime';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: getToday(),
    }
  }

  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.time}>{extractDateTime(this.state.today).date}</Text>
      </View>
    );
  }
};
