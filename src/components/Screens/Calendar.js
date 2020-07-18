import React, {useState} from 'react';
import { View } from 'react-native';


import { connect } from 'react-redux';

import Header from '../Header';
import CalendarPicker from '../CalendarPicker';
import TaskList, { FILTER_DATE } from '../TaskList';

import colors from '../../styles/colors'; 
import screenStyles from './ScreenStyles';


import { extractDate } from '../../utils/DateTime';

class Calendar extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      pickedDate: extractDate(new Date()),
    };
  }

  renderMarkedDates = () => {
    let marked = {};
    let theme = this.props.customize.darkTheme ? colors.DarkBackground : colors.LightBackground;
    if (theme === colors.LightBackground) {
    this.props.taskList.forEach(task => {
      marked[extractDate(task.dueTime)] = {marked: true, dotColor: "#5172cf", activeOpacity: 0};
    });
    marked[this.state.pickedDate] = {...marked[this.state.pickedDate], selected: true, selectedColor: "#5172cf"};
    }
    else {
      this.props.taskList.forEach(task => {
        marked[extractDate(task.dueTime)] = {marked: true, dotColor: '#6c7c96'};
      });
      marked[this.state.pickedDate] = {...marked[this.state.pickedDate], selected: true, selectedColor: "#3c3a3d"};
    }
      return JSON.parse(JSON.stringify(marked));
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }
  
  onDayPress = date => {
    this.setState({ pickedDate: date});
  }

  render() {
    const theme = this.props.customize.darkTheme ? colors.DarkBackground : colors.LightBackground;
    return(
      <View style={[screenStyles.screenContainer, {backgroundColor: theme}]}>
        <Header
          navigation={this.props.navigation} 
          title={this.props.title}
          search={true}
          notice={true}
        />
        <CalendarPicker 
          onDayPress={this.onDayPress}
          renderMarkedDates={this.renderMarkedDates}
          theme={theme}
        />
        <TaskList
          filterOption={FILTER_DATE}
          calendarView={true}
          date={this.state.pickedDate}
        />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  customize: state.customize,
  taskList: state.userData.data.tasks,
});

export default connect(mapStateToProps)(Calendar);
