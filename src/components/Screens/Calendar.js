import React from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';

import Header from '../Header';
import CalendarPicker from '../CalendarPicker';
import TaskList, { FILTER_DATE } from '../TaskList';

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
    this.props.taskList.forEach(task => {
      marked[extractDate(task.dueTime)] = {marked: true, dotColor: 'blue', activeOpacity: 0};
    });
    marked[this.state.pickedDate] = {...marked[this.state.pickedDate], selected: true};
    return JSON.parse(JSON.stringify(marked));
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }
  
  onDayPress = date => {
    this.setState({ pickedDate: date });
  }

  render() {
    return(
      <View style={screenStyles.screenContainer}>
        <Header
          navigation={this.props.navigation} 
          title={this.props.title}
          search={true}
          notice={true}
        />
        <CalendarPicker 
          onDayPress={this.onDayPress}
          renderMarkedDates={this.renderMarkedDates}
        />
        <TaskList
          filterOption={FILTER_DATE}
          date={this.state.pickedDate}
          calendarView={true}
          create={true}
        />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  taskList: state.userData.data.tasks,
});

export default connect(mapStateToProps)(Calendar);
