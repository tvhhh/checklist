import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export class Create extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.createButton} onPress={this.props.onPress}>
        <Text style={{ color: "white", fontSize: 24 }}>+</Text>
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
          color="dimgrey"
          size={36}
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
          color="dimgrey"
          size={36}
        />
      </TouchableOpacity>
    );
  }
};

export class Search extends React.Component {
  render() {
    return (
      <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
        <EvilIcons name="search" size={40} />
      </TouchableOpacity>
    );
  }
};
