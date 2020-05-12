import React from 'react';
import { Text, View, } from 'react-native';
import Header from '../components/Header/index';
import TaskList from '../components/TaskList/index';
import SearchBox from '../components/SearchBox/index';
import Button from '../components/Button/index';
import colors from '../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Header title="MY LIST" />
        <SearchBox 
          placeholder="Search here..."
        />
        {(this.state.list.length > 0) ?
          <TaskList taskList={this.state.list} /> :
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
