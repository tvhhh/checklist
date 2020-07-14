import React from 'react';
import { StyleSheet, TouchableHighlight, View, FlatList } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import screenStyles from './ScreenStyles';
import colors from '../../styles/colors';

import 'react-native-gesture-handler';


export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading : true,
      search: "",
      taskList: props.route.params.taskList,
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
      // if (itemData.includes(textData)){
      //   return true;
      // }    
      // return false;
      return itemData.includes(textData);
    });    
    this.setState({ tempTaskList: newData, search: text });
  };

  renderHeader = () => {
    return(
      <View style={styles.searchBoxContainer}>
        <SearchBar
          round
          containerStyle={styles.barContainer}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          placeholder="Search your task here..."
          onChangeText={text => this.searchFilterFunction(text)}
          value={this.state.search}
          searchIcon={<EvilIcons name="search" size={25} />}
          />
        <MaterialCommunityIcons name="filter-variant" size={30} color={colors.Button} onPress={() => {}} />
      </View>
    );
  };

  renderItem = ({item}) =>{
    return(
      <TouchableHighlight style={styles.itemFormat}>
        <ListItem title={item.title} />
      </TouchableHighlight>
    );
  }

  render() {
    return (    
      <View style={screenStyles.screenContainer}>
        <FlatList
          data={this.state.tempTaskList}
          keyExtractor={item => item.title}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
};

const styles =StyleSheet.create({
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  barContainer: {
    flex: 1,
    backgroundColor: colors.Background,
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  inputContainer: {
    backgroundColor: colors.Background,
    borderBottomWidth: 1,
    borderWidth: 1,
  },
  inputText: {
    color: colors.PrimaryText,
    fontSize: 18,
  },
  itemFormat: {
    marginRight:10,
    marginLeft:10,
    marginTop:10,
    paddingTop:8,
    paddingBottom:8,
    backgroundColor: colors.Overlay,
    borderRadius:16,
    borderWidth: 8,
    borderColor: colors.Background,
  },
});
