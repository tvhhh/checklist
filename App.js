/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar, View, YellowBox } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NetInfo from '@react-native-community/netinfo';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import TodoApp from './src/index';

import { fetchData, setConnectionStatus } from './src/redux/actions/UserDataActions';
import { fetchCustomData } from './src/redux/actions/CustomizeActions';
import { updateUserData } from './src/api';


YellowBox.ignoreWarnings(["Setting a timer"]);

class App extends React.Component {
  componentDidMount = async () => {
    await this.props.fetchCustomData();
    await this.props.fetchData();
    StatusBar.setBackgroundColor(this.props.customize.theme.Background);
    StatusBar.setBarStyle(this.props.customize.darkTheme ? "light-content" : "dark-content");
    changeNavigationBarColor(this.props.customize.theme.Background);
    NetInfo.addEventListener(state => {
      this.props.setConnectionStatus(state.isConnected);
      let uid = this.props.appData.data.uid;
      let tasks = JSON.stringify(this.props.appData.data.tasks);
      if (state.isConnected && uid !== "Guest") {
        updateUserData(uid, tasks, 'tasks');
      }
    });
  }
  
  render() {
    return <TodoApp />;
  }
};

const mapStateToProps = state => ({
  appData: state.userData,
  customize: state.customize,
});

const mapDispatchToProps = dispatch => ({
  fetchCustomData: () => dispatch(fetchCustomData()),
  fetchData: () => dispatch(fetchData()),
  setConnectionStatus: bindActionCreators(setConnectionStatus, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
