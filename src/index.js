import React from 'react';
import { Text } from 'react-native';
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
        initialRouteName="list"
        drawerContentOptions={{
          activeTintColor: "dodgerblue",
          inactiveTintColor: "grey",
          itemStyle: { marginHorizontal: 0 },
          labelStyle: { fontSize: 16 },
        }}
        screenOptions={({ route }) => ({
          drawerIcon: ({ color, size }) => {
            switch(route.name) {
              case "profile":
                return <DrawerIcon icon={<FontAwesome name="user" size={size} color={color} />} />;
              case "list":
                return <DrawerIcon icon={<Feather name="list" size={size} color={color} />} />;
              case "categories":
                return <DrawerIcon icon={<FontAwesome name="tags" size={size} color={color} />} />;
              case "groups":
                return <DrawerIcon icon={<FontAwesome name="group" size={size} color={color} />} />;
              case "settings":
                return <DrawerIcon icon={<Ionicons name="ios-settings" size={size} color={color} />} />;
            }
          },
          drawerLabel: ({ color }) => {
            switch(route.name) {
              case "profile":
                return <Text style={{ color: color, fontSize: 16 }}>PROFILE</Text>;
              case "list":
                return <Text style={{ color: color, fontSize: 16 }}>MY LIST</Text>;
              case "categories":
                return <Text style={{ color: color, fontSize: 16 }}>CATEGORIES</Text>;
              case "groups":
                return <Text style={{ color: color, fontSize: 16 }}>GROUPS</Text>;
              case "settings":
                return <Text style={{ color: color, fontSize: 16 }}>SETTINGS</Text>;
            }
          },
        })}
      >
        <Drawer.Screen name="profile" component={Profile} />
        <Drawer.Screen name="list" component={SwipeableNavigator} />
        <Drawer.Screen name="categories" component={Categories} />
        <Drawer.Screen name="groups" component={Groups} />
        <Drawer.Screen name="settings" component={Settings} />
      </Drawer.Navigator>
    );
  }
};
