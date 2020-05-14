import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SwipeableNavigator from './navigation/SwipeableNavigator';
import Search from './components/SearchBox/Search';
import TaskForm from './components/Form/TaskForm';

const Stack = createStackNavigator();

export default class TodoApp extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={SwipeableNavigator} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="TaskForm" component={TaskForm} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
