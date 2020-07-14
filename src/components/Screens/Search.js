import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Task from '../Task'
import TaskForm from '../Form/TaskForm';
import screenStyles from './screenStyles';
import colors from '../../styles/colors';
import { connect } from 'react-redux';
import { Overlay } from 'react-native-elements';
import 'react-native-gesture-handler';


class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading : true,
      search: "",
      taskList: props.route.params.taskList,
      tempTaskList: props.route.params.taskList,
      showForm: false,
      selected: {},
    };
  }

  updateState = search => {
    this.setState({search: search});
  };
  onSelectedTaskPress = task => {
    this.setState({ showForm: true, selected: task });
  }
  onFormBackdropPress = () => {
    this.setState({ showForm: false, selected: {} });
  }
  handleFormSubmit = task => {
    this.setState({ showForm: false });
    this.onEditTask(task, this.state.selected);
    this.setState({ selected: {} });
  }

  handleRemoval = () => {
    this.props.onRemoveTask(this.state.selected);
    this.setState({ showForm: false, selected: {} });
  }


  searchFilterFunction = text => {    
    const newData = this.state.taskList.filter(item => {      
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();
      if (itemData.includes(textData)){
        return true;
      }    
      return false;
    });    
    this.setState({ tempTaskList: newData, search: text });
  };

  renderHeader = () => {
    const theme = this.props.customize.darkTheme ? colors.DarkBackground : colors.LightBackground;
    const inputText = this.props.customize.darkTheme ? colors.DarkPrimaryText : colors.LightPrimaryText;
    const fontSize = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return(
      <View style={styles.searchBoxContainer}>
        <SearchBar
          round
          containerStyle={[styles.barContainer, {backgroundColor: theme}]}
          inputContainerStyle={[styles.inputContainer, {backgroundColor: theme}]}
          inputStyle={[styles.inputText, {color: inputText, fontFamily: font, fontSize: fontSize}]}
          placeholder="Search your task here..."
          onChangeText={text => this.searchFilterFunction(text)}
          value={this.state.search}
          searchIcon={<EvilIcons name="search" size={25} />}
          />
        <MaterialCommunityIcons name="filter-variant" size={30} color={colors.Button} onPress={() => {}} />
      </View>
    );
  };

  renderItem = ({ item }) => <Task {...item} onSelect={() => this.onSelectedTaskPress(item)} />

  render() {
    const theme = this.props.customize.darkTheme ? colors.DarkBackground : colors.LightBackground;
    return (    
      <View style={[screenStyles.screenContainer,{backgroundColor: theme}]}>
        <FlatList
          data={this.state.tempTaskList}
          keyExtractor={item => item.title}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
        />
        <Overlay
          isVisible={this.state.showForm} 
          onBackdropPress={this.onFormBackdropPress}
          overlayStyle={[styles.taskForm, { height: Object.keys(this.state.selected).length ? 350 : 300 }]}
        >
          <TaskForm
            {...this.state.selected}
            isOnSelected={Object.keys(this.state.selected).length > 0} 
            onSubmit={this.handleFormSubmit}
            onRemove={this.handleRemoval}
          />
        </Overlay>
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
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderWidth: 1,
  },
  inputText: {
    fontSize: 18,
  },
  itemFormat: {
    marginRight:10,
    marginLeft:10,
    marginTop:10,
    paddingTop:8,
    paddingBottom:8,
    borderRadius:16,
    borderWidth: 8,
  },
});

const mapStateToProps = state => ({
  customize: state.customize,
});

export default connect(mapStateToProps)(Search);