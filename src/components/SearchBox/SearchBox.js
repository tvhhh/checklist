import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from './styles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      showSearchBar: false,
    };
  }

  updateState = search => {
    this.setState({search})
  };

  onClick = () => {
    this.setState(prevState => ({ showSearchBar: !prevState.showSearchBar }))
  };

  render() {
    const { search, showSearchBar } = this.state
    return (
      <>
      {!showSearchBar ?
      (<TouchableOpacity style={{ top: 10, left: 10, }} onPress={this.onClick}>
        <EvilIcons name="search" size={40} />
      </TouchableOpacity>) :
      (<View style={styles.searchBoxContainer}>
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
        <Entypo name="cross" size={30} color="grey" onPress={this.onClick} />
      </View>)
      }
      </>
    );
  }
};
