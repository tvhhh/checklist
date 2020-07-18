import React from 'react';
import { View, } from 'react-native';

import Header from '../Header';
import TaskList, { FILTER_TODAY, FILTER_WEEK, FILTER_PINNED } from '../TaskList';
import { connect } from 'react-redux';
import colors from '../../styles/colors';


import screenStyles from './ScreenStyles';


class List extends React.Component {
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
    const theme = this.props.customize.darkTheme ? colors.DarkBackground: colors.LightBackground;
    const filterOption = this.getFilterOption();
    return (
      <View style={{flex: 1, backgroundColor: theme}}>
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

const mapStateToProps = state => ({
  customize: state.customize,
});

export default connect(mapStateToProps)(List);
