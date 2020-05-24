import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerIcon from './components/Drawer/DrawerIcon';
import Profile from './navigation/Profile';
import SwipeableNavigator from './navigation/SwipeableNavigator';
import Categories from './navigation/Categories';
import Groups from './navigation/Groups';
import Settings from './navigation/Settings';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

export default class TodoApp extends React.Component {
  render() {
    return (
      <Drawer.Navigator 
        initialRouteName="MY LIST"
        drawerContentOptions={{
          activeTintColor: "dodgerblue",
          inactiveTintColor: "grey",
          itemStyle: { marginHorizontal: 0 },
          labelStyle: { fontSize: 16 },
        }}
        screenOptions={({ route }) => ({
          drawerIcon: ({ color, size }) => {
            switch(route.name) {
              case "PROFILE":
                return <DrawerIcon icon={<FontAwesome name="user" size={size} color={color} />} />;
              case "MY LIST":
                return <DrawerIcon icon={<Feather name="list" size={size} color={color} />} />;
              case "CATEGORIES":
                return <DrawerIcon icon={<FontAwesome name="tags" size={size} color={color} />} />;
              case "GROUPS":
                return <DrawerIcon icon={<FontAwesome name="group" size={size} color={color} />} />;
              case "SETTINGS":
                return <DrawerIcon icon={<Ionicons name="ios-settings" size={size} color={color} />} />;
            }
          }
        })}
      >
        <Drawer.Screen name="PROFILE" component={Profile} />
        <Drawer.Screen name="MY LIST" component={SwipeableNavigator} />
        <Drawer.Screen name="CATEGORIES" component={Categories} />
        <Drawer.Screen name="GROUPS" component={Groups} />
        <Drawer.Screen name="SETTINGS" component={Settings} />
      </Drawer.Navigator>
    );
  }
};
