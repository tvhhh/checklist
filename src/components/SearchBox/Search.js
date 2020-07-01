import React from 'react';
import { Keyboard, TouchableOpacity, View, Text,FlatList } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles';
import List from '../TabView/List';
import 'react-native-gesture-handler';

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading : true,
      search: "",
      taskList : props.route.params.taskList,
    };
  }

  updateState = search => {
    this.setState({search: search});
  };


  renderHeader = () => {
    return(
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
    );
  };

  renderItem = ({item}) =>{
    return(
      <TouchableOpacity>
        <View>
         <ListItem title={item.title} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (    
      <View style={styles.searchLayout}>
      <FlatList style={styles.searchLayout}
        data = {this.state.taskList}
        keyExtractor = {item => item.title}
        renderItem = {this.renderItem}
        ListHeaderComponent = {this.renderHeader}
      />
    </View>
    );
    }
  }
