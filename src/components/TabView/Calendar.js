import React from 'react';
import { View, } from 'react-native';
import Header from '../Header/index';
import CalendarPicker from '../Calendar/index';
import Button from '../Button/index';
import colors from '../../styles/colors';
import TaskList from '../TaskList/TaskList';

export default class Calendar extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      title: "",
    }
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }
  
  onDayPress = date => {
    this.setState({title: date})
  }


  onTaskSelect = () => {} //do nothing

  render(){
    return(
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Header title="CALENDAR" />
        <Button.Menu onPress={this.toggleDrawer} />
        <CalendarPicker  taskList={this.props.taskList} onDayPress={this.onDayPress}/>
        <TaskList title={this.state.title} taskList={this.props.taskList} date={this.state.title} onTaskSelect={this.onTaskSelect}/>
        <Button.Notice />
      </View>
    );
  }
};
