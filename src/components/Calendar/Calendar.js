import React from 'react';
import { Calendar } from 'react-native-calendars';
import colors from '../../styles/colors';

export default class CalendarPicker extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      markedDates: {}
    }
  }
  
  setMarkedDates(key) {
    let markedDates = {};
    if (typeof this.state.markedDates[key] !== 'undefined') {
      markedDates = {[key]: {selected: !this.state.markedDates[key].selected}};
    } else {
      markedDates = {[key]: {selected: true}};
    }

    this.setState((prevState) => {
      return {...prevState, markedDates};
    })
  }
  
  render(){
    return(
      <Calendar
        current
        hideExtraDays={true}
        onDayPress={(day) => this.setMarkedDates(day.dateString)}
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
