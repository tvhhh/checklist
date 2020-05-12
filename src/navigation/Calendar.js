import React from 'react';
import { View, } from 'react-native';
import Header from '../components/Header/index';
import colors from '../styles/colors';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'

export default class CalendarView extends React.Component{
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
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Header title="CALENDAR" />
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
      </View>
    );
  }
};
