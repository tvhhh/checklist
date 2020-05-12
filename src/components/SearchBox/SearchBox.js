import React from 'react';
import { TouchableOpacity } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default class SearchBox extends React.Component {
  render() {
    return (
      <TouchableOpacity style={{ top: 10, left: 10, }} onPress={() => this.props.navigation.navigate(this.props.navigateTo)}>
        <EvilIcons name="search" size={40} />
      </TouchableOpacity>
    );
  }
};
