import React from 'react';
import { View, Text, EventSubscriptionVendor, TouchableOpacity, StyleSheet} from 'react-native';

import Header from '../components/Header';
import { createStackNavigator } from '@react-navigation/stack';
import { white } from 'color-name';
import { connect } from 'react-redux';
import { Menu, Notice } from '../components/Button';
import colors from '../styles/colors';
import { HomeView, GroupView, InfoView, MemberView, AddGroupView } from '../components/Screens/GroupScreens/index.js'
import {POLICIES, TASK_STATES, TEST_DATA, currentUserId} from '../utils/GroupEnum'

export const Stack = createStackNavigator();

class Groups extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    const theme = this.props.customize.theme;
    return (
      <View style={{ flex: 1, backgroundColor: theme.Background}}>
        <Header
          navigation={this.props.navigation}
          title="GROUPS"
          search={true}
          notice={true}
        />

        <Stack.Navigator headerMode="none" >
          <Stack.Screen name="home" component={HomeView} />
          <Stack.Screen name="group" component={GroupView} />
          <Stack.Screen name="info" component={InfoView} />
          <Stack.Screen name="members" component={MemberView} />
          <Stack.Screen name='create-group' component={AddGroupView} />
        </Stack.Navigator>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryColor,
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    marginVertical: 5,
    marginHorizontal: 8,
    
    borderRadius: 5,
  },
  
  menuText: {
    color: '#ffffff',
    fontFamily: "sans-serif-light",
    fontSize: 20,
    paddingVertical: 8,
    marginLeft:8,
    flex: 1,
  },

  itemText: {
    color: '#000000',
    backgroundColor: '#ffffff',
    fontSize: 16,
    paddingVertical: 8,
    marginTop: 6,
    marginLeft: 20,
    marginRight: 20, 
    borderRadius: 5,
    textAlign: 'left',
    paddingLeft: 20,
  },

  itemHeaderContainer: {
    flex:1,
    backgroundColor: colors.SecondaryColor,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    
    borderRadius: 5,
  }
});


const mapStateToProps = state => ({
  customize: state.customize,
});


export default connect(mapStateToProps)(Groups);
