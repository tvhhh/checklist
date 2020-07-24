import React from 'react';
import { View, Text, EventSubscriptionVendor, TouchableOpacity, StyleSheet} from 'react-native';

import Header from '../components/Header';
import { createStackNavigator } from '@react-navigation/stack';
import { white } from 'color-name';
import { connect } from 'react-redux';
import { Menu, Notice } from '../components/Button';
import colors from '../styles/colors';
import { HomeView, GroupView, InfoView, MemberView, AddGroupView } 
    from '../components/Screens/GroupScreens/index.js'
import {POLICIES, TASK_STATES, TEST_DATA, currentUserId} from '../utils/GroupEnum'

// function InvitationView({route, navigation}) {
//   const { group } = route.params;
//   const localStyles = {
//     infoContainer: {
//       backgroundColor: '#ffffff',
//       padding: 12,
//       marginVertical: 5,
//       marginHorizontal: 8,
      
//       borderRadius: 5,
//     },

//     infoText: {
//       color:'#000000', 
//       fontFamily:'sans-serif-light', 
//       fontSize: 24,
//       marginLeft:8,
//     },

//     acceptContainter: {
//       backgroundColor: '#00ff00',
//       flex:1,
//       padding: 12,
//       marginVertical: 5,
//       marginHorizontal: 8,
//       alignItems:'center',
      
//       borderRadius: 5,
//     },

//     denyContainer: {
//       backgroundColor: '#ff0000',
//       flex:1,
//       padding: 12,
//       marginVertical: 5,
//       marginHorizontal: 8,
//       alignItems:'center',
      
//       borderRadius: 5,
//     },

//     confirmText: {
//       color: '#ffffff',
//       fontSize: 20,
//     },
//   };

//   return(
//     <View>
//       <View
//         style={localStyles.infoContainer}
//       >
//         <Text
//           style={localStyles.infoText}
//         >
//           {group.name}
//         </Text>
//         <Text>{"Invitor: " + group.uName}</Text>
//       </View>

//       <View style={{flexDirection:'row'}}>
//         <TouchableOpacity
//           style={localStyles.denyContainer}
//           onPress={() => {navigation.popToTop();}}
//         >
//           <Text style={localStyles.confirmText}>Deny</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={localStyles.acceptContainter}
//           onPress={() => {navigation.popToTop();}}
//         >
//           <Text style={localStyles.confirmText}>Accept</Text>
//         </TouchableOpacity>

        
//       </View>
//     </View>
//   );
// }

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

        <Stack.Navigator>
          <Stack.Screen 
            name="home" 
            component={HomeView} 
            options={{title:'Home'}}  
            // initialParams={{database:TEST_DATA}}
          />

          <Stack.Screen 
            name="group" 
            component={GroupView} 
            options={({navigation, route}) => ({
              headerTitle: route.params.title,              
            })}
          />

          <Stack.Screen 
            name="info"
            component={InfoView}
            options = {({route}) => ({
              title: route.params.title,
            })}
            initialParams={{database:TEST_DATA}}
          />

          <Stack.Screen 
            name="members"
            component={MemberView}
            options={({route}) => ({
              title: route.params.title,
              members: route.params.members,
            })}
            initialParams={{database:TEST_DATA}}
          />

          <Stack.Screen
            name='create-group'
            component={AddGroupView}
            options={({route}) => ({
              title: 'Create a new group'
            })}
            initialParams={{database:TEST_DATA}}
          />

          

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
    // backgroundColor: '#1e90ff',
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
    // backgroundColor: '#1e90ff',
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
