import React from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import colors from '../../styles/colors';

export class Menu extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.menuButton} onPress={this.props.onPress}>
        <Feather 
          name="menu"
          color="dimgrey"
          size={40}
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
          size={40}
        />
      </TouchableOpacity>
    );
  }
};

export class Plus extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.plusButton} onPress={this.props.onPress}>
        <AntDesign 
          name="pluscircle"
          color={colors.PlusButton}
          size={60}
        />
      </TouchableOpacity>
    );
  }
};
