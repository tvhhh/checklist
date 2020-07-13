import React from 'react';
import { Text } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerIcon from './components/DrawerIcon';

import Profile from './navigations/Profile';
import MyList from './navigations/MyList';
import Groups from './navigations/Groups';
import Settings from './navigations/Settings';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import colors from './styles/colors';


const Drawer = createDrawerNavigator();

class TodoApp extends React.Component {
  render() {
    const theme = this.props.darkTheme ? colors.DarkBackground : colors.LightBackground;
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="list"
          drawerContentOptions={{
            activeTintColor: colors.PrimaryColor,
            inactiveTintColor: colors.DisabledColor,
            itemStyle: { marginHorizontal: 0 },
            labelStyle: { fontSize: 16 },
          }}
          drawerStyle={{
            backgroundColor: theme,
          }}
          screenOptions={({ route }) => ({
            drawerIcon: ({ color, size }) => {
              switch(route.name) {
                case "profile":
                  return <DrawerIcon icon={<FontAwesome name="user" size={size} color={color} />} />;
                case "list":
                  return <DrawerIcon icon={<Feather name="list" size={size} color={color} />} />;
                case "groups":
                  return <DrawerIcon icon={<FontAwesome name="group" size={size} color={color} />} />;
                case "settings":
                  return <DrawerIcon icon={<Ionicons name="ios-settings" size={size} color={color} />} />;
                default:
                  return null;
              }
            },
            drawerLabel: ({ color }) => {
              switch(route.name) {
                case "profile":
                  return <Text style={{ color: color, fontSize: 16 }}>PROFILE</Text>;
                case "list":
                  return <Text style={{ color: color, fontSize: 16 }}>MY LIST</Text>;
                case "groups":
                  return <Text style={{ color: color, fontSize: 16 }}>GROUPS</Text>;
                case "settings":
                  return <Text style={{ color: color, fontSize: 16 }}>SETTINGS</Text>;
                default:
                  return null;
              }
            },
          })}
        >
          <Drawer.Screen name="profile" component={Profile} />
          <Drawer.Screen name="list" component={MyList} />
          <Drawer.Screen name="groups" component={Groups} />
          <Drawer.Screen name="settings" component={Settings} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
};

const mapStateToProps = state => ({
  darkTheme: state.customize.darkTheme,
});

export default connect(mapStateToProps)(TodoApp);
