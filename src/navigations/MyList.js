import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SwipeableView from '../components/Screens/SwipeableView';
import Search from '../components/Screens/Search';
import Notification from '../components/Screens/Notification';


const Stack = createStackNavigator();

export default class MyList extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="List" component={SwipeableView} />
        <Stack.Screen name="Notice" component={Notification} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    );
  }
};
