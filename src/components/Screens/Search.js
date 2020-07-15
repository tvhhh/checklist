import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Task from '../Task'
import TaskForm from '../Form/TaskForm';
import screenStyles from './screenStyles';
import colors from '../../styles/colors';
import { Overlay } from 'react-native-elements';
import 'react-native-gesture-handler';

import { createTask, editTask, removeTask } from '../../redux/actions/TaskActions';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
      fullTaskList: this.props.taskList,
      tempTaskList: this.props.taskList,
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
    this.props.editTask(task, this.state.selected);
    this.setState({ selected: {} });
  }

  handleRemoval = () => {
    this.props.removeTask(this.state.selected);
    this.setState({ showForm: false, selected: {}});
  }


  searchFilterFunction = text => {    
    const newData = this.props.taskList.filter(item => {      
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
        <MaterialCommunityIcons name="filter-variant" size={30} color={colors.Button} onPress={() => this.props.navigation.navigate("Filter")} />
      </View>
    );
  };
  renderItem = ({ item }) => <Task {...item} onSelect={() => this.onSelectedTaskPress(item)} />
  render() {
    if((this.state.tempTaskList.length - this.props.taskList.length > 0)){
      this.setState({tempTaskList: this.props.taskList});
    }
     return (    
      <View style={screenStyles.screenContainer}>
        <FlatList
          data={this.state.tempTaskList}
          keyExtractor={(item,index) => item + index}
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
const mapStateToProps = state => ({
  taskList: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  createTask: bindActionCreators(createTask, dispatch),
  editTask: bindActionCreators(editTask, dispatch),
  removeTask: bindActionCreators(removeTask, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);