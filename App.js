/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NetInfo from '@react-native-community/netinfo';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import TodoApp from './src/index';

import { fetchData, setConnectionStatus } from './src/redux/actions/UserDataActions';
import { fetchGroups, getGroupData } from './src/redux/actions/GroupDataActions';
import { fetchCustomData } from './src/redux/actions/CustomizeActions';
import { updateUserData, fetchGroupData } from './src/api';


YellowBox.ignoreWarnings(["Setting a timer"]);

class App extends React.Component {
  componentDidMount = async () => {
    await this.props.fetchCustomData();
    await this.props.fetchData();
    await this.props.fetchGroups();
    StatusBar.setBackgroundColor(this.props.customize.theme.Background);
    StatusBar.setBarStyle(this.props.customize.darkTheme ? "light-content" : "dark-content");
    changeNavigationBarColor(this.props.customize.theme.Background);
    NetInfo.addEventListener(async (state) => {
      this.props.setConnectionStatus(state.isConnected);
      let uid = this.props.userData.data.uid;
      let tasks = JSON.stringify(this.props.userData.data.tasks);
      if (state.isConnected && uid !== "Guest") {
        updateUserData(uid, tasks, 'tasks');
        const groupData = await fetchGroupData(uid);
        this.props.getGroupData(groupData);
      }
    });
  }
  
  render() {
    return <TodoApp />;
  }
};

const mapStateToProps = state => ({
  userData: state.userData,
  groupData: state.groupData,
  customize: state.customize,
});

const mapDispatchToProps = dispatch => ({
  fetchCustomData: () => dispatch(fetchCustomData()),
  fetchData: () => dispatch(fetchData()),
  fetchGroups: () => dispatch(fetchGroups()),
  setConnectionStatus: bindActionCreators(setConnectionStatus, dispatch),
  getGroupData: bindActionCreators(getGroupData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
