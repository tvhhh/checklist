import React from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';

import Header from '../../components/Header';
import CalendarPicker from '../../components/CalendarPicker';
import TaskList, { FILTER_DATE } from '../../components/TaskList';

import { lightTheme} from '../../styles/colors';

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
    let themeBackground = this.props.customize.theme;
    if (themeBackground.Background === lightTheme.Background) {
    this.props.taskList.forEach(task => {
      marked[extractDate(task.dueTime)] = {marked: true, dotColor: "#5172cf"};
    });
    marked[this.state.pickedDate] = {...marked[this.state.pickedDate], selected: true, selectedColor: "#5172cf"};
    }
    else {
      this.props.taskList.forEach(task => {
        marked[extractDate(task.dueTime)] = {marked: true, dotColor: '#6c7c96'};
      });
      marked[this.state.pickedDate] = {...marked[this.state.pickedDate], selected: true, selectedColor: "#3c3a3d"};
    }
    return JSON.parse(JSON.stringify(marked));
  }
  
  onDayPress = date => {
    this.setState({ pickedDate: date});
  }

  render() {
    const theme = this.props.customize.theme;
    return(
      <View style={{ flex: 1, backgroundColor: theme.Background }}>
        <Header
          navigation={this.props.navigation} 
          title={this.props.title}
          search={true}
          notice={true}
        />
        <CalendarPicker 
          onDayPress={this.onDayPress}
          renderMarkedDates={this.renderMarkedDates}
          theme={theme.Background}
          font={this.props.customize.font}
        />
        <TaskList
          filterOption={FILTER_DATE}
          date={this.state.pickedDate}
          create={true}
        />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  customize: state.customize,
  taskList: state.userData.data.tasks,
});

export default connect(mapStateToProps)(Calendar);
