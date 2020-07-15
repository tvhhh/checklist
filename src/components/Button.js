import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../styles/colors';


export class Create extends React.Component {
  render() {
    let size = this.props.size || 60;

    return (
      <TouchableOpacity 
        style={[
          styles.createButton,
          this.props.position,
          {
            height: size,
            width: size,
            borderRadius: size/2,
            backgroundColor: this.props.buttonColor,
          }
        ]}
        onPress={this.props.onPress}
      >
        <Text style={{ color: "#ffffff", fontSize: size/3 }}>+</Text>
      </TouchableOpacity>
    );
  }
};

export class Menu extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.menuButton} onPress={this.props.onPress}>
        <Feather
          name="menu"
          color={colors.Button}
          size={this.props.size || 36}
        />
      </TouchableOpacity>
    );
  }
};

export class Notice extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.noticeButton} onPress={this.props.onPress}>
        <Ionicons 
          name="ios-notifications-outline"
          color={colors.Button}
          size={this.props.size || 36}
        />
      </TouchableOpacity>
    );
  }
};

export class Search extends React.Component {
  render() {
    return (
      <TouchableOpacity style={this.props.position} onPress={this.props.onPress}>
        <EvilIcons 
          name="search"
          color={colors.Button}
          size={this.props.size || 36} 
        />
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: colors.SecondaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  menuButton: {
    position: "absolute",
    top: 20,
    left: 10,
  },
  noticeButton: {
    position: "absolute",
    top: 10,
    right: 15,
  },
});
