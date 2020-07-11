import React from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';

import Header from '../Header';
import CalendarPicker from '../CalendarPicker';
import TaskList, { FILTER_DATE } from '../TaskList';
import { Menu, Notice, Search } from '../Button';

import screenStyles from './screenStyles';

import { extractDate } from '../../utils/DateTime';


class Calendar extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      pickedDate: extractDate(new Date()),
    };
  }

  renderMarkedDates = () => {
    let marked = {};
    this.props.taskList.forEach(task => {
      marked[extractDate(task.dueTime)] = {marked: true, dotColor: 'blue', activeOpacity: 0};
    });
    marked[this.state.pickedDate] = {...marked[this.state.pickedDate], selected: true};
    return JSON.parse(JSON.stringify(marked));
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }
  
  onDayPress = date => {
    this.setState({ pickedDate: date });
  }

  render() {
    return(
      <View style={screenStyles.screenContainer}>
        <Header title={this.props.title} />
        <Menu onPress={this.toggleDrawer} />
        <Search
          position={{ position: "absolute", top: 12, right: 45, }}
          onPress={() => this.props.navigation.navigate("Search",{taskList: this.props.taskList})}
        />
        <Notice onPress={() => this.props.navigation.navigate("Notice")} />
        <CalendarPicker 
          onDayPress={this.onDayPress}
          renderMarkedDates={this.renderMarkedDates}
        />
        <TaskList
          filterOption={FILTER_DATE}
          calendarView={true}
          date={this.state.pickedDate}
        />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  taskList: state.tasks,
});

export default connect(mapStateToProps)(Calendar);
