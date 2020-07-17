import React from 'react';
import { View, } from 'react-native';

import Header from '../Header';
<<<<<<< HEAD
import TaskList, { FILTER_TODAY, FILTER_WEEK, FILTER_PINNED} from '../TaskList';
import { Menu, Notice, Search } from '../Button';
=======
import TaskList, { FILTER_TODAY, FILTER_WEEK, FILTER_PINNED } from '../TaskList';
>>>>>>> 0ee3df3a12c85502f1c030477b4315b9aee7ce78

import screenStyles from './ScreenStyles';


export default class List extends React.Component {
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
<<<<<<< HEAD
        <Header title={this.props.title} />
        <Menu onPress={this.toggleDrawer} />
        <Search
          position={{ position: "absolute", top: 12, right: 45, }}
          onPress={() => this.props.navigation.navigate("Search")}
=======
        <Header
          navigation={this.props.navigation} 
          title={this.props.title}
          search={true}
          notice={true}
>>>>>>> 0ee3df3a12c85502f1c030477b4315b9aee7ce78
        />
        <TaskList filterOption={filterOption} />
      </View>
    );
  }
};
