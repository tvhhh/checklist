import React from 'react';
import { View } from 'react-native';

import Header from '../Header';
import TaskList, { FILTER_TODAY, FILTER_WEEK, FILTER_PINNED } from '../TaskList';

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
        <Header
          navigation={this.props.navigation} 
          title={this.props.title}
          search={true}
          notice={true}
        />
        <TaskList filterOption={filterOption} create={true} />
      </View>
    );
  }
};
