import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles';

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
    };
  }

  updateState = search => {
    this.setState({search: search});
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.searchLayout}>
          <View style={styles.searchBoxContainer}>
            <SearchBar
              round
              containerStyle={styles.barContainer}
              inputContainerStyle={styles.inputContainer}
              inputStyle={{ fontSize: 18 }}
              placeholder="Search your task here..."
              onChangeText={this.updateState}
              value={this.state.search}
              searchIcon={<EvilIcons name="search" size={25} />}
            />
            <MaterialCommunityIcons name="filter-variant" size={30} color="dimgrey" onPress={() => {}} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};
