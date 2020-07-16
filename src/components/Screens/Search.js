import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
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
import {extractDateTime, getToday } from '../../utils/DateTime';

class Search extends React.Component {
  constructor(props) {
    super(props)
    let today = getToday();
    this.state = {
      isDateTimePickerVisible: false,
      isStartIntervalPickerVisible: false,
      isEndIntervalPickerVisible: false,
      isCategoryPickerVisible: false,
      isCategoryPressed: false,
      isPinnedPressed: false,
      isCalendarPressed: false,
      query: "",
      category: "default",
      pinned: false,
      startInterval: "",
      endInterval: "",
      showFilter: false,
    };
  }

  updateState = query => {
    this.setState({query: query});
  };

  updateCategory = category => {
    this.setState({ category: category });
  }

  onPinnedPress = () => {
    this.setState({isPinnedPressed: !this.state.isPinnedPressed,  pinned: !this.state.pinned});
  }

  onCalendarPress = () => {
    this.toggleDateTimePicker();
  }

  handleStartIntervalConfirm = time => {
    time.setSeconds(0, 0);
    this.setState({startInterval: time});
    this.setState({ isStartIntervalPickerVisible: false });
  }
  handleEndIntervalConfirm = time => {
    time.setSeconds(0, 0);
    this.setState({endInterval: time});
    this.setState({ isEndIntervalPickerVisible: false });
  }

  onResetPress = () => {
    this.setState({
      category: "default",
      pinned: false,
      startInterval: "",
      endInterval: "",
      isPinnedPressed:false,
      isCalendarPressed: false,
    });
  }
  
  toggleCategoryPicker = () => {
    this.setState({ isCategoryPickerVisible: !this.state.isCategoryPickerVisible,isCategoryPressed: !this.state.isCategoryPressed });
  }
  toggleDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: !this.state.isDateTimePickerVisible});
    if (this.state.startInterval !== "" || this.state.endInterval !== "")
    {
      this.setState({isCalendarPressed: true});
    }
  }
  toggleStartIntervalPicker = () => {
    this.setState({isStartIntervalPickerVisible: !this.state.isStartIntervalPickerVisible});
  }
  toggleEndIntervalPicker = () => {
    this.setState({isEndIntervalPickerVisible: !this.state.isEndIntervalPickerVisible});
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
  renderDate = (extractedDateTime,type) => {
    if (type ==="start"){
      if (this.state.startInterval !== ""){
        return (
          <Text style={styles.dateTimePickerText}>{
            `${extractedDateTime.date}  ${extractedDateTime.time}`
          }</Text>
        );
      }
      else{
        return (
          <Text style={styles.dateTimePickerText}>
            Start Day
          </Text>
        );
      }
    }
    else if (type === "end"){
      if (this.state.endInterval !== ""){
        return (
          <Text style={styles.dateTimePickerText}>{
            `${extractedDateTime.date}  ${extractedDateTime.time}`
          }</Text>
        );
      }
      else{
        return (
          <Text style={styles.dateTimePickerText}>
            End Day
          </Text>
        );
      }
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
    var extractedStartInterval = "";
    var extractedEndInterval = "";
    if (this.state.startInterval !== ""){
      extractedStartInterval = extractDateTime(this.state.startInterval);
    }
    if (this.state.endInterval !== ""){
      extractedEndInterval = extractDateTime(this.state.endInterval);
    }
     return (    
      <View style={screenStyles.screenContainer}>
        <View style={styles.searchBoxContainer}>
        <SearchBar
          round
          containerStyle={styles.barContainer}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          placeholder="Search your task here..."
          onChangeText={query => this.updateState(query)}
          value={this.state.query}
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
          query = {this.state.query}
          category = {this.state.category}
          pinned = {this.state.pinned}
          interval = {[...this.state.startInterval, ...this.state.endInterval]}
        />
        <DateTimePickerModal
            isVisible={this.state.isStartIntervalPickerVisible}
            mode="datetime"
            onConfirm={this.handleStartIntervalConfirm}
            onCancel={this.toggleStartIntervalPicker}
           />
          <DateTimePickerModal
            isVisible={this.state.isEndIntervalPickerVisible}
            mode="datetime"
            onConfirm={this.handleEndIntervalConfirm}
            onCancel={this.toggleEndIntervalPicker}
           />
        <Overlay
            isVisible={this.state.isDateTimePickerVisible}
            onBackdropPress={this.toggleDateTimePicker}
            overlayStyle = {styles.dateTimePickerForm}
          >
            <Text style = {{fontSize : 20}}>From</Text>
            <TouchableOpacity style={styles.datetimePicker} onPress={this.toggleStartIntervalPicker}>
              {this.renderDate(extractedStartInterval,"start")}              
            </TouchableOpacity>
            <Text style = {{fontSize : 20}}>To</Text>
            <TouchableOpacity style={styles.datetimePicker} onPress={this.toggleEndIntervalPicker}>
              {this.renderDate(extractedEndInterval,"end")}              
            </TouchableOpacity>
          </Overlay>
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
  dateTimePickerForm: { 
    padding: 0,
    height: 180,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  dateTimePickerText: {
    fontSize: 16,
  },
  datetimePicker: {
    padding: 5,
    marginTop: 10,
    marginRight: 10,
    borderColor: colors.Border,
    borderWidth: 1,
    borderRadius: 5,
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