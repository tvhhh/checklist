import React from 'react';
import { View } from 'react-native';
import SwipeableNavigator from './navigation/SwipeableNavigator';
import Header from './components/Header/index';

export default class TodoApp extends React.Component {
  render() {
    return (
      <SwipeableNavigator />
    );
  }
};
