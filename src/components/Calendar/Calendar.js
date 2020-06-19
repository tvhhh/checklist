import React from 'react';
import { Calendar } from 'react-native-calendars';
import colors from '../../styles/colors';
import { extractDate } from '../../utils/DateTime';

export default class CalendarPicker extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      markedDates: this.props.renderMarkedDates,
    }
  };
  
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      markedDates: nextProps.renderMarkedDates,
    }
  }

  renderMarkedDates = () => {
    let marked = {};
    this.props.taskList.forEach(task => {
      marked[extractDate(task.dueTime)] = {marked: true, dotColor: 'blue', activeOpacity: 0};
    });
    return JSON.parse(JSON.stringify(marked));
 }

  setMarkedDates = date => {
    this.props.onDayPress(date);
  };


  render(){
    return(
      <Calendar
        current
        hideExtraDays={true}
        onDayPress={(day) =>  this.setMarkedDates(day.dateString)}
        markedDates={this.state.markedDates}
        theme={{
          calendarBackground: colors.Background,
          textDayFontSize: 18,
          textDayHeaderFontSize: 16,
          textMonthFontSize: 20,
        }}
      />
    );
  }
};
