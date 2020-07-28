import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

import colors, { lightTheme, darkTheme } from '../styles/colors';


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

  render() {
    if (this.props.theme === lightTheme.Background)
      return (
        <Calendar 
          hideExtraDays={true}
          onDayPress={(day) => this.setMarkedDates(day.dateString)}
          markedDates={this.state.markedDates()}
          theme={{
            calendarBackground: lightTheme.Background,
            dayTextColor: "grey",
            todayTextColor: "#4169d9",
            monthTextColor: '#5172cf',
            arrowColor: "#5172cf",
            textDayFontSize: 17,
            textDayHeaderFontSize: 16,
            textMonthFontSize: 20,
          }}
        />
      );
    else return (
      <View>
        <Calendar 
          hideExtraDays={true}
          onDayPress={(day) => this.setMarkedDates(day.dateString)}
          markedDates={this.state.markedDates()}
          theme={{
            calendarBackground: darkTheme.Background,
            todayTextColor: "#91a5c7",
            dayTextColor: "grey",
            monthTextColor: "#91a5c7",
            arrowColor: "#91a5c7",
            selectedDayTextColor: "#c3cdde",
            selectedDotColor: '#0e5e9c',
            textDayFontSize: 17,
            textDayHeaderFontSize: 16,
            textMonthFontSize: 20,
          }}
        />
      </View>
    );    
  }
};
