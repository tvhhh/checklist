import React from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles';
import colors from '../../styles/colors';

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
    };
  }

  updateState = search => {
    this.setState({search})
  };

  render() {
    const {search} = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <View style={styles.searchBoxContainer}>
          <MaterialIcons name="arrow-back" size={30} color="grey" onPress={this.props.onBack} />
          <SearchBar
            round
            containerStyle={styles.barContainer}
            inputContainerStyle={styles.inputContainer}
            inputStyle={{ fontSize: 18 }}
            placeholder={this.props.placeholder}
            onChangeText={this.updateState}
            value={search}
            searchIcon={<EvilIcons name="search" size={25} />}
          />
          <MaterialCommunityIcons name="filter-variant" size={30} color="dimgrey" />
        </View>
      </View>
    );
  }
};
