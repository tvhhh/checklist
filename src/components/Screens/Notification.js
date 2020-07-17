import React from 'react';

<<<<<<< HEAD
import { Text, View } from 'react-native';
import screenStyles from './screenStyles';
=======
import screenStyles from './ScreenStyles';
>>>>>>> 0ee3df3a12c85502f1c030477b4315b9aee7ce78


export default class Notification extends React.Component {
  render() {
    return (
      <View style={screenStyles.screenContainer}>
        <Text>Notification here</Text>
      </View>
    );
  }
};
