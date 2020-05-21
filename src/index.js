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
          itemStyle: { marginHorizontal: 0 },
          labelStyle: { fontSize: 16 },
        }}
      >
        <Drawer.Screen name="PROFILE" component={Profile} 
          options={{
            drawerIcon: ({focused}) => (
              <DrawerIcon icon={<FontAwesome name="user" size={30} color={focused ? "dodgerblue" : "grey"} />} />
            ),
          }}
        />
        <Drawer.Screen name="MY LIST" component={SwipeableNavigator} 
          options={{
            drawerIcon: ({focused}) => (
              <DrawerIcon icon={<Feather name="list" size={30} color={focused ? "dodgerblue" : "grey"} />} />
            ),
          }}
        />
        <Drawer.Screen name="MANAGEMENT" component={Categories} 
          options={{
            drawerIcon: ({focused}) => (
              <DrawerIcon icon={<FontAwesome name="tags" size={30} color={focused ? "dodgerblue" : "grey"} />} />
            ),
          }}
        />
        <Drawer.Screen name="GROUPS" component={Groups} 
          options={{
            drawerIcon: ({focused}) => (
              <DrawerIcon icon={<FontAwesome name="group" size={30} color={focused ? "dodgerblue" : "grey"} />} />
            ), 
          }}
        />
        <Drawer.Screen name="SETTINGS" component={Settings} 
          options={{
            drawerIcon: ({focused}) => (
              <DrawerIcon icon={<Ionicons name="ios-settings" size={30} color={focused ? "dodgerblue" : "grey"} />} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }
};
