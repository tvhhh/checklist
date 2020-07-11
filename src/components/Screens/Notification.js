import React from 'react';
import { Text, View } from 'react-native';

import screenStyles from './screenStyles';


export default class Notification extends React.Component {
  render() {
    return (
      <View style={screenStyles.screenContainer}>
        <Text>Notification here</Text>
      </View>
    );
  }
};
