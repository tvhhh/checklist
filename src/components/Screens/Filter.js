import React from 'react';

import { Text, View } from 'react-native';
import screenStyles from './screenStyles';


export default class Filter extends React.Component {
  render() {
    return (
      <View style={screenStyles.screenContainer}>
        <Text>Filter here</Text>
      </View>
    );
  }
};
