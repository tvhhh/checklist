import React from 'react';
import { View, } from 'react-native';

import Header from '../Header';
import TaskList from '../TaskList';
import { Menu, Notice, Search } from '../Button';

import screenStyles from './screenStyles';


export default class List extends React.Component {
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  render() {
    return (
      <View style={screenStyles.screenContainer}>
        <Header title={this.props.title} />
        <Menu onPress={this.toggleDrawer} />
        <Search
          position={{ position: "absolute", top: 12, right: 45, }}
          onPress={() => this.props.navigation.navigate("Search",{
            taskList: this.props.taskList,
          })}
          {...this.props.onRemoveTask}
        />
        <Notice onPress={() => this.props.navigation.navigate("Notice")} />
        <TaskList {...this.props} />
      </View>
    );
  }
};
