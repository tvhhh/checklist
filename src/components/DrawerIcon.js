import React from 'react';
import { StyleSheet, View, } from 'react-native';


export default class DrawerIcon extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.icon}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
  },
});
