import React from 'react';
import { Calendar } from 'react-native-calendars';
import colors from '../styles/colors';
import { connect } from 'react-redux';

export default class CalendarPicker extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      markedDates: this.props.renderMarkedDates,
      theme: this.props.theme,
    };
  };
  
  static getDerivedStateFromProps(nextProps) {
    return {
      markedDates: nextProps.renderMarkedDates,
      theme: nextProps.theme,
    };
  }

  setMarkedDates = date => {
    this.props.onDayPress(date);
  };

  theming = () => {
    const theme = this.state.theme;
    return {
      calendarBackground: theme,
      dayTextColor: "grey",
      monthTextColor: "grey",
      textDayFontSize: 18,
      textDayHeaderFontSize: 16,
      textMonthFontSize: 20,
    }
  }

  render(){
    // const` theme = this.props.darkTheme ? colors.DarkBackground : colors.LightBackground;
    return(
      <Calendar
        hideExtraDays={true}
        onDayPress={(day) =>  this.setMarkedDates(day.dateString)}
        markedDates={this.state.markedDates()}
        theme={this.theming()}
      />
    );
  }
};

// const mapStateToProps = state => ({
//   darkTheme: state.customize.darkTheme,
// });

// export default connect(mapStateToProps)(CalendarPicker);