import React from 'react';
import { connect } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';


import ProfileManagement from '../components/Screens/ProfileManagement';
import List from '../components/Screens/List';
import LogIn from '../components/Screens/LogIn';
import SignUp from '../components/Screens/SignUp';
import ForgotPassword from '../components/Screens/ForgotPassword';


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
