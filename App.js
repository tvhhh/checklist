/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { YellowBox } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NetInfo from '@react-native-community/netinfo';

import TodoApp from './src/index';

import { fetchData, setConnectionStatus } from './src/redux/actions/UserDataActions';
import { updateUserData } from './src/api';


YellowBox.ignoreWarnings(["Setting a timer"]);

class App extends React.Component {
  componentDidMount = async () => {
    await this.props.fetchData();
    NetInfo.addEventListener(state => {
      this.props.setConnectionStatus(state.isConnected);
      let data = this.props.appData.data
      if (state.isConnected && this.props.appData.loggedIn) {
        updateUserData(data.username, data);
      }
    });
  }
  
  render() {
    return <TodoApp />;
  }
};

const mapStateToProps = state => ({
  appData: state.userData,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData()),
  setConnectionStatus: bindActionCreators(setConnectionStatus, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
