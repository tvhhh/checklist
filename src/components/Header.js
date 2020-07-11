import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../styles/colors';

import { extractDateTime } from '../utils/DateTime';


export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.time}>{extractDateTime(this.state.today).date}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginBottom: 10,
  },
  title: {
    color: colors.TitleText,
    fontSize: 24,
    textAlign: "center",
  },
  time: {
    color: colors.SecondaryText,
    fontSize: 14,
    textAlign: "center",
  },
});
