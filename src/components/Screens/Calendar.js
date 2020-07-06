import React from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';

import Header from '../Header';
import CalendarPicker from '../CalendarPicker';
import TaskList from '../TaskList';
import { Menu, Notice, Search } from '../Button';

import screenStyles from './screenStyles';

import { extractDate } from '../../utils/DateTime';


class Calendar extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      pickedDate: extractDate(new Date()),
    }
  }

  renderMarkedDates = () => {
    let marked = {};
    this.props.taskList.forEach(task => {
      marked[extractDate(task.dueTime)] = {marked: true, dotColor: 'blue', activeOpacity: 0};
    });
    return JSON.parse(JSON.stringify(marked));
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }
  
  onDayPress = date => {
    this.setState({pickedDate: date})
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
        <View style={styles.calendarField}>
          <CalendarPicker 
            onDayPress={this.onDayPress}
            renderMarkedDates={this.renderMarkedDates}
          />
        </View>
        <TaskList
          calendarView={true} 
          date={this.state.pickedDate} 
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  calendarField: {
    marginBottom: 20,
  },
});

const mapStateToProps = state => ({
  taskList: state.todos,
});

export default connect(mapStateToProps)(Calendar);
