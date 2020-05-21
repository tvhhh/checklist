import React from 'react';
import { View, } from 'react-native';

export default class DrawerIcon extends React.Component {
  render() {
    return (
      <View style={{ alignItems: "center" ,height: 35, width: 35 }}>
        {this.props.icon}
      </View>
    );
  }
};
