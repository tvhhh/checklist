import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';

import Header from '../Header';
import CalendarPicker from '../CalendarPicker';
import TaskList from '../TaskList';
import { Menu, Notice, Search } from '../Button';
import colors from '../../styles/colors'; 
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
    marked[this.state.pickedDate] = {...marked[this.state.pickedDate], selected: true}
    return JSON.parse(JSON.stringify(marked));
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }
  
  onDayPress = date => {
    this.setState({pickedDate: date})
  }

  // static getDerivedStateFromProps(nextProps) {
  //   const [{key, theme}, setTheme] = useState({key: 'light', theme: {
  //     calendarBackground: colors.LightBackground,
  //     dayTextColor: "grey",
  //     monthTextColor: "grey",
  //     textDayFontSize: 18,
  //     textDayHeaderFontSize: 16,
  //     textMonthFontSize: 20,
  //   }})
  // }

  render() {
    const theme = this.props.darkTheme ? colors.DarkBackground : colors.LightBackground;
    return(
      <View style={[screenStyles.screenContainer, {backgroundColor: theme}]}>
        <Header title={this.props.title} />
        <Menu onPress={this.toggleDrawer} />
        <Search
          position={{ position: "absolute", top: 12, right: 45, }}
          onPress={() => this.props.navigation.navigate("Search",{taskList: this.props.taskList})}
        />
        <Notice onPress={() => this.props.navigation.navigate("Notice")} />
        <View style={{marginBottom: 20}}>
          <CalendarPicker 
            onDayPress={this.onDayPress}
            renderMarkedDates={this.renderMarkedDates}
            theme={theme}
            // key={this.props.key}
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

const mapStateToProps = state => ({
  taskList: state.todos,
  darkTheme: state.customize.darkTheme,
});

export default connect(mapStateToProps)(Calendar);
