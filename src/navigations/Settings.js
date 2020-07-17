import React from 'react';
import { StyleSheet, View, } from 'react-native';

import Header from '../components/Header';

import colors from '../styles/colors';


export default class Settings extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <Header navigation={this.props.navigation} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.Background,
  },
});
