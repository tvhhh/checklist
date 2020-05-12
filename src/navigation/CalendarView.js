import React from 'react';
import { View, } from 'react-native';
import CalendarPicker from '../components/Calendar/index';
import Header from '../components/Header/index';
import colors from '../styles/colors';

export default class CalendarView extends React.Component{  
  render(){
    return(
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Header title="CALENDAR" />
        <CalendarPicker />
      </View>
    );
  }
};
