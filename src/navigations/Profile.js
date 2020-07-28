import React from 'react';
import { connect } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';


import ProfileManagement from '../screens/UserScreens/ProfileManagement';
import List from '../screens/TaskScreens/List';
import LogIn from '../screens/UserScreens/LogIn';
import SignUp from '../screens/UserScreens/SignUp';
import ForgotPassword from '../screens/UserScreens/ForgotPassword';


const GuestStack = createStackNavigator();
const RegisteredStack = createStackNavigator();

class GuestScreen extends React.Component {
  render() {
    return (
      <GuestStack.Navigator initialRouteName="LogIn" headerMode="none">
        <GuestStack.Screen name="LogIn" component={LogIn} />
        <GuestStack.Screen name="SignUp" component={SignUp} />
        <GuestStack.Screen name="Forgot" component={ForgotPassword} />
      </GuestStack.Navigator>
    );
  }
};

class RegisteredUserScreen extends React.Component {
  render() {
    return (
      <RegisteredStack.Navigator headerMode="none">
        <RegisteredStack.Screen name="Profile" component={ProfileManagement} />
        <RegisteredStack.Screen name="List" component={List} />
      </RegisteredStack.Navigator>
    );
  }
};

class Profile extends React.Component {
  render() {
    return (
      <>
        {this.props.loggedIn ? <RegisteredUserScreen /> : <GuestScreen />}
      </>
    );
  }
};

const mapStateToProps = state => ({
  loggedIn: state.userData.loggedIn,
});

export default connect(mapStateToProps)(Profile);
