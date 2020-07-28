import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SwipeableView from '../screens/TaskScreens/SwipeableView';
import List from '../screens/TaskScreens/List';
import Search from '../screens/TaskScreens/Search';


const Stack = createStackNavigator();

export default class MyList extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="SwipeableView" headerMode="none">
        <Stack.Screen name="SwipeableView" component={SwipeableView} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="List" component={List} />
      </Stack.Navigator>
    );
  }
};
