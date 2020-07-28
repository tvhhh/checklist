import React from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements';
import { POLICIES, TASK_STATES, TEST_DATA, currentUserId, getPolicyFromGroup } from '../../utils/GroupEnum'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { removeUserFromGroupAsync, changeUserPolicy } from '../../redux/actions/GroupDataActions'
import ConfirmationBox from '../../components/Forms/ConfirmationBox'


class MemberView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayConfirmDelete: false,
      selectUser: null,
    } 
  }

  renderHeader(title) {
    const maxLengthForTitle = 15;
    const displayTitle  = title.length > maxLengthForTitle ?
      title.substring(0, maxLengthForTitle-3) + '...' : title;

    return (
      <View 
      style={[
          styles.header,
          {
            backgroundColor: this.props.customize.theme.Background,
          }
        ]}
      >
      <TouchableOpacity
          style={
            {
              marginRight:20,
              flex:1
            }
          }
          onPress={() => {this.props.navigation.navigate('info')}}
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
        >{`Members: ${displayTitle}`}</Text>
      </View>
    ); 
  }

  toggleConfirmationBox = () => {
    this.setState({...this.state, displayConfirmDelete: !this.state.displayConfirmDelete});
  }

  handleRemove(user) {
    this.setState({...this.state, selectUser: user})
    this.toggleConfirmationBox();
  }

  handleRemoveAfterConfirm = () => {
    const group = this.props.groupData.filter(group => group.gid === this.props.route.params.gid)[0];
    const username = this.state.selectUser.username;
    console.debug('in handle remove after confirm');
    console.debug(this.state);
    console.debug(username);
    this.props.removeUserFromGroupAsync(username, group.gid);
    this.toggleConfirmationBox();
  }

  handleChangePolicy(user) {
    console.debug('in handle change policy');
    const group = this.props.groupData.filter(group => group.gid === this.props.route.params.gid)[0];
    if (user.policy == POLICIES.ADMIN) {
      this.props.changeUserPolicy(user.username, group.gid, POLICIES.MEMBER);
    }

    if (user.policy == POLICIES.MEMBER) {
      this.props.changeUserPolicy(user.username, group.gid, POLICIES.ADMIN);
    }
  }

  renderMemberList(group) {
    const localStyles={
      container: {
        ...styles.container,
        backgroundColor: this.props.customize.theme.Overlay,
      },
      menuText: {
        ...styles.menuText,
        color: this.props.customize.theme.PrimaryText, 
        fontSize: this.props.customize.fontSize.PrimaryText, 
        fontFamily: this.props.customize.font,
      }
    }

    const memberList = [{username: group.owner, policy: POLICIES.OWNER, key: 0}];
    const thisPolicy = getPolicyFromGroup(group, this.props.userData.data.username);

    for (let admin of group.admins) {
      if (group.owner && admin !== group.owner)
        memberList.push({username: admin, policy: POLICIES.ADMIN, key: memberList.length});
    }
    for (let member of group.members) {
      memberList.push({username: member, policy: POLICIES.MEMBER, key: memberList.length});
    }

    const displayList = memberList.map(user => {
      return (
        <View
          style={localStyles.container}
          key={user.key}
        >
          <Text
            style={{
              ...localStyles.menuText,
              flex: 3,
              textAlign:'left',
            }}
          >
            {user.username}
          </Text>

          <Text
            style={{
              ...localStyles.menuText,
              flex: 3,
              color: this.props.customize.theme.SecondaryText,
              textAlign:'right',
            }}
          >
            {user.policy}
          </Text>

          {/* change policy */}
          {((thisPolicy === POLICIES.OWNER || thisPolicy === POLICIES.ADMIN)
            && (user.policy !== POLICIES.OWNER) && (user.username !== this.props.userData.data.username)
            )?
          <TouchableOpacity
            style={{
              flex: 1,
              contentAlign:'center',
              alignItems: 'center',
            }}
            onPress={() => {this.handleChangePolicy(user)}}
          >
            <MaterialIcons
              name={"edit"}
              size={20}
              color={this.props.customize.theme.TitleText}
            />
          </TouchableOpacity>: null}

          {/* delete users */}
          {((thisPolicy === POLICIES.OWNER || thisPolicy === POLICIES.ADMIN)
            && (user.policy !== POLICIES.OWNER) && (user.username !== this.props.userData.data.username)
            )?
          <TouchableOpacity
            style={{
              flex: 1,
              contentAlign:'center',
              alignItems: 'center',
            }}
            onPress={() => {this.setState({...this.state, displayConfirmDelete: true ,selectUser: user})}}
          >
            <AntDesign
              name={"deleteuser"}
              size={20}
              color={this.props.customize.theme.TitleText}
            />
          </TouchableOpacity>:null}
        </View>
      );
    })
    return (
      <View>
        {displayList.map(item => item)}
      </View>
    );
  }

  render() {
    const group = this.props.groupData.filter(group => group.gid === this.props.route.params.gid)[0];
    const theme = this.props.customize.theme;
    const isVisible = this.state.displayConfirmDelete;
    return (
      <View 
        style={{
          flex:1,
          backgroundColor: this.props.customize.theme.Background,
        }}
      > 
        {this.renderHeader(group.name)}
        {this.renderMemberList(group)}

        <Overlay
          isVisible={isVisible}
          overlayBackgroundColor={theme.Overlay}
          overlayStyle={styles.confirmationBox}
          children={
            <ConfirmationBox 
              title={"Remove this user?"}
              onCancel={this.toggleConfirmationBox}
              onConfirm={this.handleRemoveAfterConfirm}
              customize={this.props.customize}
            />
          }
          animationType="fade"
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  customize: state.customize,
  groupData: state.groupData,
  userData: state.userData,
});

const mapDispachToProps = (dispatch) => ({
  removeUserFromGroupAsync: (username, gid) => dispatch(removeUserFromGroupAsync(username, gid)), 
  changeUserPolicy: bindActionCreators(changeUserPolicy, dispatch),
});

export default connect(mapStateToProps, mapDispachToProps)(MemberView);

const styles = StyleSheet.create({
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
    padding: 15,
    marginTop: 10,
    marginHorizontal: 8,
    borderRadius: 20,
  }, 
  menuText: {
    paddingVertical: 0,
    marginLeft: 8,
  },
  confirmationBox: {
    height: 150,
    width: 300,
    borderRadius: 5,
  },
})


export function MemberViewOld({route, navigation}) {
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
