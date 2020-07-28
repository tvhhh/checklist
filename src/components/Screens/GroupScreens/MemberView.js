import React from 'react'
import {View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import {POLICIES, TASK_STATES, TEST_DATA, currentUserId} from '../../../utils/GroupEnum'
import { bindActionCreators } from 'redux';
import {connect } from 'react-redux'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class MemberView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: this.props.route.params.group,
    } 
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

  render() {
    return (
      <View> 
        {this.renderHeader()}
        <Text>
          {JSON.stringify(this.state.group)}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  customize: state.customize,
});

const mapDispachToProps = (dispatch) => ({

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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
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
