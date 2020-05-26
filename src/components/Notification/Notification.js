import React from 'react';
import { Text, View } from 'react-native';
import colors from '../../styles/colors';

export default class Notification extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Text>Notification here</Text>
      </View>
    );
  }
};
