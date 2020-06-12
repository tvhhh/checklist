import React from 'react';
import { Calendar } from 'react-native-calendars';
import colors from '../../styles/colors';
import { extractDate } from '../../util/DateTime';

export default class CalendarPicker extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      markedDates: this.renderMarkedDates(),
    }
  };
  

  setMarkedDates = key => {
    let marked = {};
    this.props.onDayPress(key);
    if (typeof this.state.markedDates[key] !== 'undefined') {
      marked = {[key]: {selected: !this.state.markedDates[key].selected}};
    } else {
      marked = {[key]: {selected: true}};
    }

    this.setState((prevState) => {
      return {...prevState, marked};
    })
  };

  renderMarkedDates = () => {
    let marked = {};
    this.props.taskList.forEach(task => {
      marked[extractDate(task.dueTime)] = {marked: true, dotColor: 'blue', activeOpacity: 0};
    });
    return JSON.parse(JSON.stringify(marked));
 }

  // renderMarkedDates = taskList => {
  //   let markedDates = {};
  //   let markedEvents = {};
  //   taskList.forEach(task => {
  //     let date = extractDate(task.dueTime);
  //     markedEvents = {[date]: {marked: true, dotColor: 'red'}};
  //     markedDates = {...markedDates, markedEvents};
  //   });
  //   this.setState({markedDates: {...markedDates}});
  // };

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
