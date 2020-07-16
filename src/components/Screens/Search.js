import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CategoryPicker from './../Form/CategoryPicker';
import { Overlay } from 'react-native-elements';
import Category from '../Category';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import screenStyles from './screenStyles';
import colors from '../../styles/colors';
import 'react-native-gesture-handler';
import TaskList, {FILTER_SEARCH} from './../TaskList'

import { createTask, editTask, removeTask } from '../../redux/actions/TaskActions';
import { Value } from 'react-native-reanimated';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isCategoryPickerVisible: false,
      isCategoryPressed: false,
      isPinnedPressed: false,
      isCalendarPressed: false,
      quiry: "",
      category: "default",
      pinned: false,
      interval: "",
      showFilter: false,
    };
  }

  updateState = quiry => {
    this.setState({quiry: quiry});
  };

  updateCategory = category => {
    this.setState({ category: category });
  }

  onPinnedPress = () => {
    this.setState({isPinnedPressed: !this.state.isPinnedPressed,  pinned: !this.state.pinned});
  }

  onCalendarPress = (interval) => {
    this.setState({isCalendarPressed: !this.state.isCalendarPressed, interval: interval})
  }

  onResetPress = () => {
    this.setState({
      category: "default",
      pinned: false,
      interval: ""
    });
  }
  
  toggleCategoryPicker = () => {
    this.setState({ isCategoryPickerVisible: !this.state.isCategoryPickerVisible,isCategoryPressed: !this.state.isCategoryPressed });
  }

  toggleFilter = () => {
    this.setState({showFilter: !this.state.showFilter});
  }

  renderCategoryBox = () => {
    if (this.state.category){
      return(
        <View style = {this.state.isCategoryPressed ? styles.filterButtonContainerPressed:styles.filterButtonContainerUnpressed}>
          <Category name = {this.state.category} size = {15}/>
          <Text style = {this.state.isCategoryPressed ? styles.filterBoxTextPressed:styles.filterBoxTextUnpressed}
          > {this.state.category.charAt(0).toUpperCase() + this.state.category.slice(1)}
          </Text>
        </View>
      );
      }
      else{
        return (
          <View style = {this.state.isCategoryPressed ? styles.filterButtonContainerPressed:styles.filterButtonContainerUnpressed}> 
          <Category name = {this.state.category} size = {15}/>
            <Text style = {this.state.isCategoryPressed ? styles.filterBoxTextPressed:styles.filterBoxTextUnpressed}
            > {this.state.category}
            </Text>
          </View>
        );
      }
  }

  renderFilter = () => {
    if(this.state.showFilter){
      return(
        <View style = {styles.filterBoxContainer}>
        <TouchableOpacity onPress = {this.toggleCategoryPicker} >
          {this.renderCategoryBox()}
        </TouchableOpacity>
  
        <TouchableOpacity onPress = {this.onPinnedPress}>
          <View style = {this.state.isPinnedPressed ? styles.filterButtonContainerPressed:styles.filterButtonContainerUnpressed}>
            <MaterialCommunityIcons name="pin" size={15} color='#2bd1ea' />  
            <Text style = {this.state.isPinnedPressed ? styles.filterBoxTextPressed:styles.filterBoxTextUnpressed}> Pinned Task</Text>
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity onPress = {this.onCalendarPress}>
          <View style = {this.state.isCalendarPressed ? styles.filterButtonContainerPressed:styles.filterButtonContainerUnpressed}>
            <AntDesign name="calendar" size={15} color= {this.state.isCalendarPressed === true ? "#FD66FF" : 'brown'} />  
            <Text style = {this.state.isCalendarPressed ? styles.filterBoxTextPressed:styles.filterBoxTextUnpressed}> Interval</Text>
          </View>
        </TouchableOpacity>
          
        <TouchableOpacity onPress = {this.onResetPress}>
        <View style = {styles.resetButton}>
          <MaterialCommunityIcons name = "restart"/>
        </View>
        </TouchableOpacity>
      </View>
      );    
    }
    else{
      return null;
    }
  }
  render() {
    const filterOption = FILTER_SEARCH;
     return (    
      <View style={screenStyles.screenContainer}>
        <View style={styles.searchBoxContainer}>
        <SearchBar
          round
          containerStyle={styles.barContainer}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          placeholder="Search your task here..."
          onChangeText={quiry => this.updateState(quiry)}
          value={this.state.quiry}
          searchIcon={<EvilIcons name="search" size={25} />}
          />
          <TouchableOpacity onPress={this.toggleFilter}>
          <MaterialCommunityIcons name="filter-variant" size={30} color={colors.Button}/>     
          </TouchableOpacity>
           
        </View>
        {this.renderFilter()}        
        <Overlay
            isVisible={this.state.isCategoryPickerVisible}
            onBackdropPress={this.toggleCategoryPicker}
            overlayStyle={styles.categoryPickerForm}
          >
            <CategoryPicker onBack={this.toggleCategoryPicker} onSubmit={this.updateCategory} hasDefault = {true} />
          </Overlay>
        <TaskList 
          filterOption = {filterOption}
          quiry = {this.state.quiry}
          category = {this.state.category}
          pinned = {this.state.pinned}
        />

      </View>
    );
  }
};

const styles = StyleSheet.create({
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  filterBoxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  filterButtonContainerUnpressed: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.Button ,
    marginHorizontal: 14,
  },
  filterButtonContainerPressed: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.Button ,
    backgroundColor: colors.Button,
    marginHorizontal: 14,
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
  filterBoxTextUnpressed: {
    color: colors.SecondaryText,
    fontSize: 13,
  },
  filterBoxTextPressed: {
    color: colors.Background,
    fontSize: 13,
  },
  categoryPickerButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  categoryPickerForm: { 
    padding: 0,
    height: 280,
    width: 300,
    borderRadius: 5,
  },
  resetButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.Button ,
    marginHorizontal: 14,
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