import React from 'react';

import screenStyles from './ScreenStyles';


export default class Notification extends React.Component {
  render() {
    return (
      <View style={screenStyles.screenContainer}>
        <Text>Notification here</Text>
      </View>
    );
  }
};
