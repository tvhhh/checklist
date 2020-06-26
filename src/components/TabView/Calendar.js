import React from 'react';
import { View, } from 'react-native';
import Header from '../Header/index';
import CalendarPicker from '../Calendar/index';
import Button from '../Button/index';
import colors from '../../styles/colors';
import TaskList from '../TaskList/TaskList';
import { extractDate } from '../../utils/DateTime';
import { Overlay } from 'react-native-elements';
import TaskForm from '../Form/TaskForm';

export default class Calendar extends React.Component{
  constructor (props) {
    super(props);
    this.state={
      title: extractDate(new Date()),
      showForm: false,
      showSearch: false,
      showNotice: false,
      selected: {},
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
    this.setState({title: date})
  }

  handleSubmit = task => {
    this.setState({ showForm: false });
    if (Object.keys(this.state.selected).length) {
      this.props.onEditTask(task, this.state.selected);
    } else {
      this.props.onCreateTask(task);
      this.setState({ selected: {} });
    }
  }

  handleRemoval = () => {
    this.props.onRemoveTask(this.state.selected);
    this.setState({ showForm: false, selected: {} });
  }

  onTaskSelect = task => {
    this.setState({ showForm: true, selected: task });
  }

  onFormBackdropPress = () => {
    this.setState({ showForm: false, selected: {} });
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  }

  // onTaskSelect = () => {} //do nothing

  render(){
    return(
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Header title="CALENDAR" />
        <Button.Menu onPress={this.toggleDrawer} />
        <CalendarPicker  taskList={this.props.taskList} onDayPress={this.onDayPress} renderMarkedDates={this.renderMarkedDates()}/>
        <TaskList title={this.state.title} taskList={this.props.taskList} date={this.state.title} onTaskSelect={this.onTaskSelect}/>
        <Button.Create onPress={this.toggleForm} />
        <Overlay 
          isVisible={this.state.showForm} 
          onBackdropPress={this.onFormBackdropPress}
          overlayStyle={{
            padding: 0,
            height: Object.keys(this.state.selected).length ? 350 : 300,
            borderRadius: 10,
          }}
        >
          <TaskForm
            {...this.state.selected}
            isOnSelected={Object.keys(this.state.selected).length > 0} 
            onSubmit={this.handleSubmit}
            onRemove={this.handleRemoval}
          />
        </Overlay>  
        <Button.Notice />
      </View>
    );
  }
};
