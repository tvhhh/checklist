import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import { SearchBar } from 'react-native-elements';

import { connect } from 'react-redux';

import TaskList, { FILTER_SEARCH } from '../TaskList';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CategoryPicker from '../Forms/CategoryPicker';
import { Overlay } from 'react-native-elements';
import Category from '../Category';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import colors, { lightTheme, darkTheme } from '../../styles/colors';
import { smallFonts, mediumFonts, largeFonts } from '../../styles/fonts';

import { extractDate } from '../../utils/DateTime';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDatePickerVisible: false,
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
      errorInterval:false,
    };
  }

  updateState = query => {
    this.setState({query: query});
  };

  updateCategory = category => {
    this.setState({ category: category, isCategoryPickerVisible: false });
  }

  onPinnedPress = () => {
    this.setState({isPinnedPressed: !this.state.isPinnedPressed,  pinned: !this.state.pinned});
  }

  onCalendarPress = (interval) => {
    this.toggleDatePicker();
  }

  onResetPress = () => {
    this.setState({
      isPinnedPressed: false,
      isCategoryPressed:false,
      isCalendarPressed: false,
      category: "default",
      pinned: false,
      startInterval: "",
      endInterval: "",
      errorInterval: false,
    });
  }
  
  handleStartIntervalConfirm = time => {
    time.setHours(0,0,0,0);
    this.setState({startInterval: time});
    if (this.state.startInterval > this.state.endInterval && this.state.endInterval !== ""){
      this.setState({errorInterval: true})
    }
    else{
      this.setState({errorInterval: false})
    }
    this.setState({ isStartIntervalPickerVisible: false });
  }

  handleEndIntervalConfirm = time => {
    time.setHours(23,59,59,99);
    this.setState({endInterval: time});
    if (this.state.startInterval > this.state.endInterval && this.state.startInterval !== ""){
      this.setState({errorInterval: true})
    }
    else{
      this.setState({errorInterval: false})
    }
    this.setState({ isEndIntervalPickerVisible: false });
  }

  toggleStartIntervalPicker = () => {
    this.setState({isStartIntervalPickerVisible: !this.state.isStartIntervalPickerVisible})
  }

  toggleEndIntervalPicker = () => {
    this.setState({isEndIntervalPickerVisible: !this.state.isEndIntervalPickerVisible})
  }

  toggleDatePicker = () => {
    this.setState({ isDatePickerVisible: !this.state.isDatePickerVisible});
    if (this.state.startInterval !== "" || this.state.endInterval !== ""){
      this.setState({isCalendarPressed: true})
    }
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
    this.setState({showFilter: !this.state.showFilter, isDatePickerVisible: false});
  }

  toggleIntervalChecker = () => {
    if (this.state.startInterval > this.state.endInterval){
      this.setState({errorInterval: true})
    }
    else{
      this.setState({errorInterval: false})
    }
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

  renderDate = (extractedDate, type) => {
    if (extractedDate !== ""){
      return(
        <Text style={styles.datePickerText}>{`${extractedDate}`}</Text>
      );
    }
    if (type === "start"){
      return (
        <Text>Start Day</Text>
      );
    }
    else {
      return (
        <Text>End Day</Text>
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
          <MaterialCommunityIcons name = "restart" size = {17}/>
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
    // const theme = this.props.customize.darkTheme ? colors.DarkBackground : colors.LightBackground;
    // const inputText = this.props.customize.darkTheme ? colors.DarkPrimaryText : colors.LightPrimaryText;
    const theme = this.props.customize.darkTheme ? darkTheme : lightTheme;
    const fonts = mediumFonts;
    const font = this.props.customize.font;

    const filterOption = FILTER_SEARCH;
    var extractedStartInterval= "";
    var extractedEndInterval = "";
    if (this.state.startInterval !== ""){
      extractedStartInterval =  extractDate(this.state.startInterval);
    }
    if(this.state.endInterval !== ""){
      extractedEndInterval = extractDate(this.state.endInterval);
    }
    return (    
      <View style={{ flex: 1, backgroundColor: theme.Background }}>
        <View style={styles.searchBoxContainer}>
          <SearchBar
            round
            containerStyle={[styles.barContainer, {backgroundColor: theme.Background}]}
            inputContainerStyle={[styles.inputContainer, {backgroundColor: theme.Background}]}
            inputStyle={[styles.inputText, {color: theme.PrimaryText, fontFamily: font, fontSize: fonts.PrimaryText}]}
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
        {this.state.isDatePickerVisible ? 
          <View style = {styles.datePickerForm}>
            <Text style = {{
              color: colors.SecondaryText,
              fontSize: 15,
              marginHorizontal: 10
            }}>From</Text>
            <TouchableOpacity style={styles.datePickerButton} onPress={this.toggleStartIntervalPicker}>
              {this.renderDate(extractedStartInterval,"start")}
            </TouchableOpacity>
            <Text style = {{
              color: colors.SecondaryText,
              fontSize: 15,
              marginHorizontal: 10
            }}>To</Text>
            <TouchableOpacity style={styles.datePickerButton} onPress={this.toggleEndIntervalPicker}>
              {this.renderDate(extractedEndInterval,"end")}
            </TouchableOpacity>
          </View> : null
        }
        {this.state.isDatePickerVisible ?
          <View style = {{
            flexDirection: "row",
            marginTop: 5,
            borderRadius: 5,
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {this.state.errorInterval ? 
              <Text style = {{
                color: 'red',
                fontSize: 15
              }}>The start day should not be larger than the end day
              </Text> :null
            }          
          </View> : null
        }        
        <Overlay
            isVisible={this.state.isCategoryPickerVisible}
            onBackdropPress={this.toggleCategoryPicker}
            overlayStyle={styles.categoryPickerForm}
          >
            <CategoryPicker onSubmit={this.updateCategory} hasDefault={true} customize={this.props.customize} />
          </Overlay>
        <TaskList 
          filterOption = {filterOption}
          query = {this.state.query}
          category = {this.state.category}
          pinned = {this.state.pinned}
          startInterval = {this.state.errorInterval ? "":this.state.startInterval}
          endInterval = {this.state.errorInterval ? "": this.state.endInterval}
          isNotFilter = {this.state.errorInterval === true ? 
            true:(
            this.state.query === "" &
            this.state.category === "default" &
            this.state.pinned === false &
            this.state.startInterval === "" &
            this.state.endInterval === ""
            )
          }
          customize={this.props.customize}
        />        
        <DateTimePickerModal
          isVisible={this.state.isStartIntervalPickerVisible}
          mode="date"
          onConfirm={this.handleStartIntervalConfirm}
          onCancel={this.toggleStartIntervalPicker}
        />
        <DateTimePickerModal
          isVisible={this.state.isEndIntervalPickerVisible}
          mode="date"
          onConfirm={this.handleEndIntervalConfirm}
          onCancel={this.toggleEndIntervalPicker}
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
  datePickerForm:{
    height: 50,
    borderRadius: 15,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: "row",
    padding: 0,
    borderRadius: 5,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  datePickerText: {
    fontSize: 16,
  },
  datePickerButton: {
    padding: 5,
    marginHorizontal: 10,
    borderColor: colors.Border,
    borderWidth: 1,
    borderRadius: 5,
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
  taskList: state.tasks,
  customize: state.customize,
});

export default connect(mapStateToProps)(Search);
