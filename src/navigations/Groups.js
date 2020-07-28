import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import Fontisto from 'react-native-vector-icons/Fontisto';

import colors from '../styles/colors';

import { HomeView, GroupView, InfoView, MemberView, AddGroupView, AddMemberView } from '../screens/GroupScreens/index';


export const Stack = createStackNavigator();

class Groups extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    const theme = this.props.customize.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <View style={{ flex: 1, backgroundColor: theme.Background}}>
        <Header
          navigation={this.props.navigation}
          title="GROUPS"
          search={true}
          notice={true}
        />
        {this.props.userData.loggedIn?
          <Stack.Navigator headerMode="none" >
            <Stack.Screen name="home" component={HomeView} />
            <Stack.Screen name="group" component={GroupView} />
            <Stack.Screen name="info" component={InfoView} />
            <Stack.Screen name="members" component={MemberView} />
            <Stack.Screen name='create-group' component={AddGroupView} />
            <Stack.Screen name='add-members' component={AddMemberView} />
          </Stack.Navigator>:
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Fontisto name="user-secret" size={80} color={colors.PrimaryColor} />
            <Text style={{ color: theme.TitleText, fontSize: fonts.TitleText, fontFamily: font }}>You haven't logged in yet</Text>
            <TouchableOpacity style={{ backgroundColor: colors.PrimaryColor, marginTop: 10, padding: 10, borderRadius: 10 }} onPress={() => {this.props.navigation.jumpTo('profile')}}>
              <Text style={{ color: "white", fontSize: fonts.ButtonText, fontFamily: font }}>TO LOGIN PAGE</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }
};

const mapStateToProps = state => ({
  customize: state.customize,
  userData: state.userData,
});


export default connect(mapStateToProps)(Groups);
