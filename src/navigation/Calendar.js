import React from 'react';
import { Text, View, } from 'react-native';
import Header from '../components/Header/index';
import colors from '../styles/colors';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'

// const CalendarView = (props) => {
//   const setMarkedDate = (day) => {
    
//   }
//   return (
//     <View style={{ flex: 1, backgroundColor: colors.GhostWhite }}>
//       <Header title="CALENDAR" />
//       {/* <Text>Calendar here</Text> */}
//       <Calendar
//         current
//         hideExtraDays={true}
        
//       />
//     </View>
//   );
// };

class CalendarView extends React.Component{
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
      <View style={{ flex: 1, backgroundColor: colors.GhostWhite }}>
        <Header title="CALENDAR" />
        {/* <Text>Calendar here</Text> */}
        <Calendar
          current
          hideExtraDays={true}
          onDayPress={(day) => this.setMarkedDates(day.dateString)}
          markedDates={this.state.markedDates}
        />
      </View>
    );
  }
};

export default CalendarView;
