import React from 'react';
import { Keyboard, TouchableHighlight, View, Text,FlatList } from 'react-native';
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
      tempTaskList: props.route.params.taskList,
    };
  }

  updateState = search => {
    this.setState({search: search});
  };

  searchFilterFunction = text => {    
    const newData = this.state.taskList.filter(item => {      
      const itemData = `${item.title.toUpperCase()}`;
       const textData = text.toUpperCase();
       if (itemData.includes(textData)){
         return true;
       }    
       return false;
    });    
    this.setState({ tempTaskList: newData,search: text });  
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
          onChangeText={text => this.searchFilterFunction(text)}
          value={this.state.search}
          searchIcon={<EvilIcons name="search" size={25} />}
          />
        <MaterialCommunityIcons name="filter-variant" size={30} color="dimgrey" onPress={() => {}} />
      </View>
    );
  };

  renderItem = ({item}) =>{
    return(
      <TouchableHighlight style = {styles.itemFormat}>
        <ListItem 
          title={item.title} />
      </TouchableHighlight>
    );
  }

  render() {
    return (    
      <View style={styles.searchLayout}>
      <FlatList style={styles.searchLayout}
        data = {this.state.tempTaskList}
        keyExtractor = {item => item.title}
        renderItem = {this.renderItem}
        ListHeaderComponent = {this.renderHeader}
      />
    </View>
    );
    }
  }
