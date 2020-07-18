import React, {useState} from 'react';
import { Calendar } from 'react-native-calendars';
import { View } from 'react-native';1
import colors from '../styles/colors';
import { connect } from 'react-redux';

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
    if (this.props.theme === colors.LightBackground) {
      return (
        <Calendar 
        hideExtraDays={true}
        onDayPress={(day) =>  this.setMarkedDates(day.dateString)}
        markedDates={this.state.markedDates()}
        theme={{
          calendarBackground: colors.LightBackground,
          dayTextColor: "grey",
          todayTextColor: "#4169d9",
          monthTextColor: '#5172cf',
          arrowColor: "#5172cf",
          textDayFontSize: 18,
          textDayHeaderFontSize: 16,
          textMonthFontSize: 20,
        }}
      />
      );
    }
    else return (
      <View>
        <Calendar 
          hideExtraDays={true}
          onDayPress={(day) =>  this.setMarkedDates(day.dateString)}
          markedDates={this.state.markedDates()}
          theme={{
            calendarBackground: colors.DarkBackground,
            todayTextColor: "#91a5c7",
            dayTextColor: "grey",
            monthTextColor: "#91a5c7",
            arrowColor: "#91a5c7",
            selectedDayTextColor: "#c3cdde",
            selectedDotColor: '#0e5e9c',
            textDayFontSize: 18,
            textDayHeaderFontSize: 16,
            textMonthFontSize: 20,
          }}
        />
      </View>
    );
  }
};