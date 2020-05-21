import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SwipeableNavigator from './navigation/SwipeableNavigator';

const Stack = createStackNavigator();

export default class TodoApp extends React.Component {
  render() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={SwipeableNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
};
