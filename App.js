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

import TodoApp from './src/index';

import { fetchData } from './src/redux/actions/UserDataActions';
import { fetchCustomData } from './src/redux/actions/CustomizeActions';


YellowBox.ignoreWarnings(["Setting a timer"]);

class App extends React.Component {
  componentDidMount = () => {
    this.props.fetchData();
    this.props.fetchCustomData();
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
  fetchData: () => dispatch(fetchData()),
  fetchCustomData: () => dispatch(fetchCustomData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
