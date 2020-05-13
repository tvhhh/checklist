import React from 'react';
import { Text, View, } from 'react-native';
import Header from '../components/Header/index';
import TaskList from '../components/TaskList/index';
import SearchBox from '../components/SearchBox/index';
import Button from '../components/Button/index';
import colors from '../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default class WeekList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {text: "Finish PSE Mockup", time: "TODAY, 12:00 PM", category: "work"},
        {text: "Doi no NMH", time: "TODAY, 3:00 PM", category: "payment"},
        {text: "Do OS Assignment", time: "TODAY, 5:00 PM", category: "study"},
        {text: "Go jogging", time: "TODAY, 7:00 PM", category: "workout"},
        {text: "Take medicine", time: "TODAY, 9:00 PM", category: "health"},
        {text: "Adidas Ford", time: "TODAY, 11:00 PM", category: "entertainment"},
      ],
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Header title="Noteras" />
        <SearchBox navigation={this.props.navigation} navigateTo="Search" />
        {(this.state.list.length > 0) ?
          <TaskList title="This Week" taskList={this.state.list} /> :
          (<View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
            <Text style={{ color: "dimgrey", fontFamily: "notoserif", fontSize: 28 }}>What are you gonna do?</Text>
            <Text style={{ color: "dimgrey", fontFamily: "notoserif", fontSize: 20 }}>Tap + to create a new task</Text>
            <FontAwesome5
              name="tasks"
              color="grey"
              size={50}
            />
          </View>)
        }
        <Button.Plus />
      </View>
    );
  } 
};
