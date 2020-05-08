import React from 'react';
import { SearchBar } from 'react-native-elements';
import styles from './styles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default class Search extends React.Component {
  render() {
    return (
      <SearchBar
        round
        containerStyle={styles.barContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={{ fontSize: this.props.fontSize || 18 }}
        placeholder={this.props.placeholder}
        searchIcon={() => (<EvilIcons name="search" size={this.props.size || 25} />)}
      />
    );
  }
};
