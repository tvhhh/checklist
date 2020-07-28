import React from 'react'
import { View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import {POLICIES, TASK_STATES, TEST_DATA, currentUserId, getPolicyFromGroup} from '../../../utils/GroupEnum'
import { bindActionCreators } from 'redux';
import {connect } from 'react-redux'
import colors from '../../../styles/colors'
import { leaveGroup, deleteGroup } from '../../../redux/actions/GroupDataActions'
import { removeGroupId } from '../../../redux/actions/UserDataActions'

class InfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: this.props.route.params.group,
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
            
            const policy = getPolicyFromGroup(this.state.group, this.props.userData.data.username);
            if (policy === POLICIES.OWNER) {
              this.props.deleteGroup(this.state.group.gid);
            } else {
              this.props.leaveGroup(this.props.userData.data.username, this.state.group.gid);
            }

            this.props.removeGroupId(this.state.group.gid);
            this.props.navigation.navigate('home')
            //navigation.popToTop();
          }
        }
      ],
      { cancelable: false }
    );

  }

  renderHeader() {
    const title = this.state.group.name;
    const maxLengthForTitle = 15;
    const displayTitle  = title.length >  maxLengthForTitle ?
                    title.substring(0, maxLengthForTitle-3) + '...':
                    title;

    return (
      <View 
        style={[
          styles.header,
          {
            backgroundColor: this.props.customize.theme.Background,
          }
        ]}
      >
      {/* back button */}
      <TouchableOpacity
          style={
            {
              marginRight:20,
              flex:1
            }
          }
          onPress={() => {this.props.navigation.navigate('group')}}
        >
          <MaterialIcons
            name={"arrow-back"}
            size={25}
            color={this.props.customize.theme.TitleText}
          />
        </TouchableOpacity>

        <Text
          style={
            {
              color: this.props.customize.theme.TitleText, 
              fontSize: this.props.customize.fontSize.TitleText, 
              fontFamily: this.props.customize.font,
              flex: 8,
            }
          }
        >{`Info: ${displayTitle}`}</Text>
      </View>
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
      },
      menuText: {
        ...styles.menuText,
        color: this.props.customize.theme.TitleText, 
        fontSize: this.props.customize.fontSize.TitleText, 
        fontFamily: this.props.customize.font,
      },
      container: {
        ...styles.container,
        backgroundColor: this.props.customize.theme.Overlay,
      }
    }
    const policy = getPolicyFromGroup(this.state.group, this.props.userData.data.username);
    const navigation = this.props.navigation;

    return (
      <View 
        style={{
          backgroundColor: this.props.customize.theme.Background,
          flex:1,
        }}
      >

        {this.renderHeader()}

        <TouchableOpacity
          onPress={() => navigation.navigate('members', {
            group: this.state.group,
          })}
          style={localStyles.container}
        > 
          {/* <Text style={styles.menuText}> {"Members"} </Text>   */}
          <Text style={localStyles.menuText}> {"Members"} </Text>  
        </TouchableOpacity>

        {(policy === POLICIES.OWNER || policy == POLICIES.ADMIN)?
        <TouchableOpacity
          style={localStyles.container}
          onPress={() => {navigation.navigate('add-members',{group: this.state.group})}}
        > 
          <Text style={localStyles.menuText}> {"Add more people"} </Text>  
        </TouchableOpacity>:
        null
        }

        <TouchableOpacity
          style={localStyles.container}
          onPress={() => {this.createLeaveConfirmOverlay()}}
        > 
          <Text style={localStyles.menuText}> {"Leave group"} </Text>  
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  customize: state.customize,
  userData: state.userData,
  groupData: state.groupData,
});

const mapDispatchToProps = (dispatch) => ({
  leaveGroup: bindActionCreators(leaveGroup, dispatch),
  removeGroupId: bindActionCreators(removeGroupId, dispatch),
  deleteGroup: bindActionCreators(deleteGroup, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoView)

const styles=StyleSheet.create({
  header: {
    flexDirection:'row',
    padding: 20,
    textAlign: 'center',
    backgroundColor: '#ffffff',
    color: '#ffffff',
    fontSize: 30,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginTop: 10,
    marginHorizontal: 8,
    borderRadius: 20,
    borderColor: colors.Border,
    borderBottomWidth: 0.5,
    marginHorizontal: 20,
  }, 
  menuText: {
    paddingVertical: 8,
    marginLeft: 8,
  },
})

// export function InfoViewOld({route, navigation}) {
//   const { group, policy, database } = route.params;
//   const localStyles = {
//     container: {
//       backgroundColor: '#1e90ff',
//       padding: 12,
//       marginVertical: 5,
//       marginHorizontal: 8,
      
//       borderRadius: 5,
//     },
//     item: {
//       color:'#ffffff', 
//       fontFamily:'sans-serif-light', 
//       fontSize: 20,
//       marginLeft:8,
//     }
//   }

//   function createLeaveConfirmOverlay() {

//     Alert.alert(
//       "Confirm",
//       "Leaving this group ?",
//       [
//         {
//           text: "Cancel",
//           // onPress: () => console.log("Cancel Pressed"),
//           style: "cancel"
//         },
//         { 
//           text: "OK", 
//           onPress: () => {
//             // console.debug(database.groups[group.gid].admins)
//             database.groups[group.gid].admins = database.groups[group.gid].admins.filter(id => id !== currentUserId)
//             database.groups[group.gid].members = database.groups[group.gid].members.filter(id => id !== currentUserId)
//             database.users[currentUserId].groups = database.users[currentUserId].groups.filter(id => id !== group.gid)
//             console.debug("in infoview, after leave group")
//             console.debug(database.users[currentUserId])
//             navigation.navigate('home', {database: database})
//             //navigation.popToTop();
//           }
//         }
//       ],
//       { cancelable: false }
//     );

//   }
  
//   return (
//     <View>
//       <TouchableOpacity
//         onPress={() => navigation.navigate('members', {
//           title: 'Members: ' + group.name,
//           group: group,
//         })}
//         style={localStyles.container}
//       > 
//         {/* <Text style={styles.menuText}> {"Members"} </Text>   */}
//         <Text style={localStyles.item}> {"Members"} </Text>  
//       </TouchableOpacity>

//       {
//       (policy === POLICIES.OWNER || policy == POLICIES.ADMIN) &&
//       <TouchableOpacity
//         style={localStyles.container}
//       > 
//         <Text style={localStyles.item}> {"Add more people"} </Text>  
//       </TouchableOpacity>
//       }

//       <TouchableOpacity
//         style={localStyles.container}
//         onPress={createLeaveConfirmOverlay}
//       > 
//         <Text style={localStyles.item}> {"Leave group"} </Text>  
//       </TouchableOpacity>
//     </View>
//   );
// }

