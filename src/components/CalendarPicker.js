import React from 'react';
import { Calendar } from 'react-native-calendars';

import colors from '../styles/colors';

import { extractDate } from '../utils/DateTime';


export default class CalendarPicker extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      markedDates: this.props.renderMarkedDates,
    };
  };
  
  static getDerivedStateFromProps(nextProps) {
    return {
      markedDates: nextProps.renderMarkedDates,
    };
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
        markedDates={this.state.markedDates()}
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
