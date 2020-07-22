import React, {setParams} from 'react'
import { View, Text, TouchableOpacity, Alert} from 'react-native'

import {POLICIES, TASK_STATES, TEST_DATA, currentUserId} from '../../../utils/GroupEnum'
import {connect } from 'react-redux'
import { SequenceEqualOperator } from 'rxjs/operators/sequenceEqual';
import { throwStatement } from '@babel/types';


class InfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  createLeaveConfirmOverlay() {
    Alert.alert(
      "Confirm",
      "Leaving this group ?",
      [
        {
          text: "Cancel",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: () => {
            // console.debug(database.groups[group.gid].admins)
            // database.groups[group.gid].admins = database.groups[group.gid].admins.filter(id => id !== currentUserId)
            // database.groups[group.gid].members = database.groups[group.gid].members.filter(id => id !== currentUserId)
            // database.users[currentUserId].groups = database.users[currentUserId].groups.filter(id => id !== group.gid)
            // console.debug("in infoview, after leave group")
            // console.debug(database.users[currentUserId])
            this.props.navigation.navigate('home')
            //navigation.popToTop();
          }
        }
      ],
      { cancelable: false }
    );

  }

  render() {
    const localStyles = {
      container: {
        backgroundColor: '#1e90ff',
        padding: 12,
        marginVertical: 5,
        marginHorizontal: 8,
        
        borderRadius: 5,
      },
      item: {
        color:'#ffffff', 
        fontFamily:'sans-serif-light', 
        fontSize: 20,
        marginLeft:8,
      }
    }
    const { policy } = this.props.route.params;
    const navigation = this.props.navigation;

    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('members', {
            title: 'Members: ' + group.name,
            gid: this.props.route.params.gid,
          })}
          style={localStyles.container}
        > 
          {/* <Text style={styles.menuText}> {"Members"} </Text>   */}
          <Text style={localStyles.item}> {"Members"} </Text>  
        </TouchableOpacity>

        {
        (policy === POLICIES.OWNER || policy == POLICIES.ADMIN) &&
        <TouchableOpacity
          style={localStyles.container}
        > 
          <Text style={localStyles.item}> {"Add more people"} </Text>  
        </TouchableOpacity>
        }

        <TouchableOpacity
          style={localStyles.container}
          onPress={() => {this.createLeaveConfirmOverlay()}}
        > 
          <Text style={localStyles.item}> {"Leave group"} </Text>  
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(InfoView)


export function InfoViewOld({route, navigation}) {
  const { group, policy, database } = route.params;
  const localStyles = {
    container: {
      backgroundColor: '#1e90ff',
      padding: 12,
      marginVertical: 5,
      marginHorizontal: 8,
      
      borderRadius: 5,
    },
    item: {
      color:'#ffffff', 
      fontFamily:'sans-serif-light', 
      fontSize: 20,
      marginLeft:8,
    }
  }

  function createLeaveConfirmOverlay() {

    Alert.alert(
      "Confirm",
      "Leaving this group ?",
      [
        {
          text: "Cancel",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: () => {
            // console.debug(database.groups[group.gid].admins)
            database.groups[group.gid].admins = database.groups[group.gid].admins.filter(id => id !== currentUserId)
            database.groups[group.gid].members = database.groups[group.gid].members.filter(id => id !== currentUserId)
            database.users[currentUserId].groups = database.users[currentUserId].groups.filter(id => id !== group.gid)
            console.debug("in infoview, after leave group")
            console.debug(database.users[currentUserId])
            navigation.navigate('home', {database: database})
            //navigation.popToTop();
          }
        }
      ],
      { cancelable: false }
    );

  }
  
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('members', {
          title: 'Members: ' + group.name,
          group: group,
        })}
        style={localStyles.container}
      > 
        {/* <Text style={styles.menuText}> {"Members"} </Text>   */}
        <Text style={localStyles.item}> {"Members"} </Text>  
      </TouchableOpacity>

      {
      (policy === POLICIES.OWNER || policy == POLICIES.ADMIN) &&
      <TouchableOpacity
        style={localStyles.container}
      > 
        <Text style={localStyles.item}> {"Add more people"} </Text>  
      </TouchableOpacity>
      }

      <TouchableOpacity
        style={localStyles.container}
        onPress={createLeaveConfirmOverlay}
      > 
        <Text style={localStyles.item}> {"Leave group"} </Text>  
      </TouchableOpacity>
    </View>
  );
}