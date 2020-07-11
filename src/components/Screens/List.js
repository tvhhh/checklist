import React from 'react';
import { View, } from 'react-native';

import Header from '../Header';
import TaskList, { FILTER_TODAY, FILTER_WEEK, FILTER_PINNED } from '../TaskList';
import { Menu, Notice, Search } from '../Button';

import screenStyles from './screenStyles';


export default class List extends React.Component {
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  getFilterOption = () => {
    switch(this.props.title) {
      case "MY DAY":
        return FILTER_TODAY;
      case "MY WEEK":
        return FILTER_WEEK;
      case "PINNED":
        return FILTER_PINNED;
      default:
        return null;
    }
  }

  render() {
    const filterOption = this.getFilterOption();

    return (
      <View style={screenStyles.screenContainer}>
        <Header title={this.props.title} />
        <Menu onPress={this.toggleDrawer} />
        <Search
          position={{ position: "absolute", top: 12, right: 45, }}
          onPress={() => this.props.navigation.navigate("Search",{taskList: this.props.taskList})}
        />
        <Notice onPress={() => this.props.navigation.navigate("Notice")} />
        <TaskList filterOption={filterOption} />
      </View>
    );
  }
};
