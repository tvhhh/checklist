import React from 'react'
import { View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native'
import { connect } from 'react-redux'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { POLICIES, TASK_STATES, TEST_DATA, currentUserId, getPolicyFromGroup } from '../../utils/GroupEnum'
import { bindActionCreators } from 'redux';

import { leaveGroup, removeUserFromGroupAsync } from '../../redux/actions/GroupDataActions'
import { deleteGroup } from '../../api'
import { removeGroupId } from '../../redux/actions/UserDataActions'


class InfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  createLeaveConfirmOverlay() {
    const group = this.props.groupData.filter(group => group.gid === this.props.route.params.gid)[0];
    Alert.alert(
      "Confirm",
      "Leaving this group ?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: () => {
            
            const policy = getPolicyFromGroup(group, this.props.userData.data.username);
            if (policy === POLICIES.OWNER) {
              group.members.forEach(username => {this.props.removeUserFromGroupAsync(username, group.gid)});
              group.admins.forEach(username => {this.props.removeUserFromGroupAsync(username, group.gid)});
              this.props.removeGroupId(group.gid);
              this.props.leaveGroup(this.props.userData.data.username, group.gid);
              deleteGroup(group.gid);
            } else {
              this.props.removeUserFromGroupAsync(this.props.userData.data.username, group.gid);
              this.props.removeGroupId(group.gid);
              this.props.leaveGroup(this.props.userData.data.username, group.gid);
            }
            this.props.navigation.navigate('home')
          }
        }
      ],
      { cancelable: false }
    );

  }

  renderHeader(title) {
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
    const group = this.props.groupData.filter(group => group.gid === this.props.route.params.gid)[0];
    const policy = getPolicyFromGroup(group, this.props.userData.data.username);
    const navigation = this.props.navigation;

    return (
      <View 
        style={{
          backgroundColor: this.props.customize.theme.Background,
          flex:1,
        }}
      >

        {this.renderHeader(group?group.name:"")}

        <TouchableOpacity
          onPress={() => navigation.navigate('members', {
            gid: this.props.route.params.gid,
          })}
          style={localStyles.container}
        > 
          {/* <Text style={styles.menuText}> {"Members"} </Text>   */}
          <Text style={localStyles.menuText}> {"Members"} </Text>  
        </TouchableOpacity>

        {(policy === POLICIES.OWNER || policy == POLICIES.ADMIN)?
        <TouchableOpacity
          style={localStyles.container}
          disabled={!this.props.userData.connected}
          onPress={() => {navigation.navigate('add-members',{gid: this.props.route.params.gid})}}
        > 
          <Text style={localStyles.menuText}> {"Add more people"} </Text>  
        </TouchableOpacity>:
        null
        }

        <TouchableOpacity
          style={localStyles.container}
          disabled={!this.props.userData.connected}
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
  removeUserFromGroupAsync: (username, gid) => dispatch(removeUserFromGroupAsync(username, gid)), 
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
  }, 
  menuText: {
    paddingVertical: 8,
    marginLeft: 8,
  },
})
