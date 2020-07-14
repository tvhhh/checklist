import React from 'react';
import { connect } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';


import ProfileManagement from '../components/Screens/ProfileManagement';
import LogIn from '../components/Screens/LogIn';
import SignUp from '../components/Screens/SignUp';
import colors from '../styles/colors';
import { connect } from 'react-redux';

const Stack = createStackNavigator();


class GuestScreen extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    );
  }
};

class Profile extends React.Component {
  render() {
    const theme = this.props.customize.darkTheme ? colors.DarkBackground: colors.LightBackground ;
    return (
      <>
        {this.props.loggedIn ? 
          <ProfileManagement navigation={this.props.navigation} /> : 
          <GuestScreen />
        }
      </>
    );
  }
};

const mapStateToProps = state => ({
  customize: state.customize,
  loggedIn: state.userData.loggedIn,
});

export default connect(mapStateToProps)(Profile);
