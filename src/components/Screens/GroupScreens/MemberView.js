import React from 'react'
import {View, Text, TouchableOpacity, FlatList } from 'react-native'
import {POLICIES, TASK_STATES, TEST_DATA, currentUserId} from '../../../utils/GroupEnum'

export function MemberView({route, navigation}) {
  const { group, database} = route.params;
  const localStyles = {
    container: {
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      padding: 12,
      marginVertical: 5,
      marginHorizontal: 8,
      
      borderRadius: 5,
    },

    nameText: {
      flex:2,
      color:'#000000', 
      fontFamily:'sans-serif-light', 
      fontSize: 16,
      marginLeft:8,
    },

    policyText: {
      flex:1,
      color:'#acacac', 
      fontFamily:'sans-serif-light', 
      fontSize: 16,
    },
  }

  let members = [];
  for (let admin of group.admins) {
    members.push({uid: admin, policy: POLICIES.ADMIN})
  }
  for (let member of group.members) {
    members.push({uid: member, policy: POLICIES.MEMBER})
  }

  return (
    <View>
      {/* <Text>{JSON.stringify(database.users[group.admins[0]].username)}</Text>
      <Text>{JSON.stringify(group)}</Text> */}
      <FlatList
        data={members}
        keyExtractor={item => item.uid}
        renderItem={({item}) => 
          <TouchableOpacity
            style={localStyles.container}
          >
            <Text style={localStyles.nameText}> {database.users[item.uid].username} </Text>
            <Text style={localStyles.policyText}> {item.policy} </Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}
