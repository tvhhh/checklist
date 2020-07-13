/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { connect } from 'react-redux';

import TodoApp from './src/index';

import { fetchData } from './src/redux/actions/TaskActions';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.fetchData();
  }
  
  render() {
    return <TodoApp />;
  }
};

const mapStateToProps = state => ({
  taskList: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
