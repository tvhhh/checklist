import React, {useState} from 'react';
import { Alert, Dimensions, ScrollView, View, Text, EventSubscriptionVendor, TouchableOpacity, SectionList, FlatList, StyleSheet } from 'react-native';

import Header from '../components/Header';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesgin from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import TaskForm from '../components/Form/TaskForm';

import { StackNavigator } from 'react-navigation'
import { createStackNavigator } from '@react-navigation/stack';
import { switchCase } from '@babel/types';
import { white } from 'color-name';
import { connect } from 'react-redux';
import { Menu, Notice } from '../components/Button';
import colors from '../styles/colors';

// import console = require('console');
// import console = require('console');

// import Group from '../components/GroupList/index';

const POLICIES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MEMBER: 'member',
}

const TASK_STATES = {
  DONE: 'done',
  NOT_DONE: 'not-done',
  NOT_RELATED: 'not-related',
}

const RETURN_STATUS = {
  OK: 'ok',
  UID_NOT_FOUND: 'uid-not-found',
};

const TEST_DATA = {
  users: [
    {
      id: 0,
      name: 'khoa',
      groups: [
        {
          id: 0, 
          policy: POLICIES.OWNER,
        },
        {
          id: 2,
          policy: POLICIES.MEMBER,
        }
      ],

      invitations: [
        {
          id: 0,
          name: 'another group',
          uid: 1,
          uName: 'not khoa'
        }
      ],

    }
  ],

  groups: [
    {
      id: 0,
      name: 'It has a name',
      users: [
        {
          id: 0,
          name: 'khoa',
          policy: POLICIES.OWNER,
        }
      ],
      tasks: [
        {
          id: 0,
          name: '123',
          description: '123456',
          dueDate: '22/22/2022',
          participants: [
            {
              id: 0,
              done: false,
            }
          ],
        }
      ],
    },

    {
      id: 1,
      name: 'another group',
      users: [],
      tasks: [],
    },

    { 
      id: 2,
      name: 'Starving',
      users: [
        {
          id: 0,
          name: 'khoa',
          policy: POLICIES.MEMBER,
        }
      ],

      tasks: [
        {
          id: 0,
          name: 'Alo alo',
          description: '123456',
          dueDate: '01/012022',
          participants: [
            {
              id: 0,
              done: false,
            }
          ],
        }
      ],
    }
  ],
}

/* class Server: is supposed to be a running server

*/

class Server {
  constructor(data) {
    this.users = data.users; // infomation of all users, users: [ {id, username, groups: [{gid, policy}]} ]
    this.groups = data.groups; // infomation of all groups, groups:[ {id, title, tasks: {name, description, dueDateTime, participants, state}, users: [{uid, policy}] } ]
  }


  /*
  input: 
    uid: int
      user's id


  output: {status, (userInfo), (groupsInfo), (invitationsInfo) }
    status: RETURN_STATUS
      -- return status (been list in constructor)

    userInfo: User, return when status = OK
      -- infomation about user

    groupsInfo: {id, policy, users, tasks, pendingUsers}, return when status = OK
      id: int
        -- id of group
      users: {id, name, policy}[]
        -- array containing info about all users of this group
        id: int
          -- id of user
        name: string
          -- name of user
        policy: POLICIES
          -- user with id policy in this group
      tasks: GroupTask[]
        -- array containing all info of taks of this group
      pendingUsers: {id, name}[]
        -- array contatining all info of pending users of this group
        id: int
          -- id of user
        name: string
          -- name of user
    
    invitationsInfo: {gid, gName, uid, uName}, return when status = OK
      groupId: int
        -- group id
      groupName: string
        -- group name
  */
  getClientInfo(uid) {
    let res = {};
    let userInfo = this.users.filter(user => {return user.id === uid});
    if (userInfo.length !== 0) {
      res.userInfo = {name: userInfo[0].name, groups: userInfo[0].groups};
      res.invitationsInfo = userInfo[0].invitations;

      res.groupsInfo = [];
      for(const group of this.groups) {
        for (const user of group.users) {
          if (user.id === uid) {
            res.groupsInfo.push(group);
          }
        }
      }
      res.status = RETURN_STATUS.OK;  
    }
    else {
      res.status = RETURN_STATUS.UID_NOT_FOUND;
    }
    return res;
  }
}

/* class User: contains information about a user
  
*/

class User {
  constructor(uid, name) {
    this.uid = uid;
    this.name = name;
    this.groups = []; // id and user policy
    this.invitations = []; // groups id
  }

  addGroup(groupId, policy) {
    this.groups.push({groupId: groupId, policy: policy});
  }

  removeGroup(groupId) {
    this.groups = this.groups.filter(item=>item.groupId != groupId);
  }
}

/* class GroupTask: contains information about a task.
  
*/

class GroupTask {
  constructor(name, description, dueTime, participants) {
    this.name = name;
    this.description = description;
    this.dueTime = dueTime;
    this.participants = participants;
  }
}

/* class Group: contains information about a group.

*/

class Group {
  constructor(id, name) {
    this.id = id;
    this.name = name; // string
    this.users = []; // {id: int, policy: POLICIES} []
    this.pendingUsers = []; // id
    this.tasks = []; // GroupTask[]
  }
}

/*class Client: the class which is emmbeded to the app, back end (?)*/

class Client {
  constructor(server) {
    this.uid = -1; // user id
    this.server = server; // (fake) server connection 
    this.clientInfo = null;
  }

  setUid(uid) {
    this.uid = uid;
  }

  getAllInfo() {
    this.clientInfo = {...this.server.getClientInfo(this.uid)}; // deepcopy, to simulate getting data from server.
    if (this.clientInfo.status == RETURN_STATUS.UID_NOT_FOUND) {
      // console.debug("Client, getAllInfo(), UID = " + this.uid + ": NOT FOUND ON SERVER !");
    } else
    {
      // adding policy to groupsInfo.groups.group
      for(let group of this.clientInfo.groupsInfo) {
        for(let userGroup of this.clientInfo.userInfo.groups) {
          if (group.id === userGroup.id) {
            group.policy = userGroup.policy;
          }
        }
      }

      // console.debug("UID = " + this.uid + " FOUND ON SERVER !");
      // console.debug(this.clientInfo);
    }
  }
}

let server = new Server(TEST_DATA);
let client = new Client(server);
client.setUid(0);
client.getAllInfo();

/*BACK END STUFF END HERE*/

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuText: this.props.menuText,
      groups: this.props.groups,
      type: this.props.type,
      // menu: [
      //   {
      //     key: 'It has a name now',
      //     tasks: [
      //       {
      //         key: '0',
      //         name: 'Go Pro',
      //         state: TASK_STATES.DONE,
      //         description: 'abcxyz ?',
      //         dueTime: '11:59',
      //         dueDate: '22/22/2022',
      //         participants: ['khoa', 'khoa2', 'another khoa'],
      //       },

      //       {
      //         key: '1',
      //         name: 'update UI',
      //         state: TASK_STATES.NOT_DONE,
      //         description: 'do it!',
      //         dueTime: '23:01',
      //         dueDate: '01/22/2022',
      //         participants: ['captain','niatpac'],
      //       },

      //       {
      //         key: '2',
      //         name: 'Try not to starve',
      //         state: TASK_STATES.NOT_RELATED,
      //         description: 'plz',
      //         dueTime: '00:00',
      //         dueDate: '01/01/2022',
      //         participants: ['wes'],
      //       },

      //       {
      //         key: '3',
      //         name: 'ABC',
      //         state: TASK_STATES.NOT_RELATED,
      //         description: '?',
      //         dueTime: '00:00',
      //         dueDate: '01/01/2022',
      //         participants: ['someone'],
      //       },

      //     ],
      //   },
      // ],

      isShowingMenu: false,
    }
  }

  toggleShowMenu() {
    this.setState({isShowingMenu: !this.state.isShowingMenu});
  }

  render() {
    return (
      <View> 
        <TouchableOpacity
          onPress={() => this.toggleShowMenu()}
          style={styles.container}
        > 
          <Text style={styles.menuText}> {this.state.menuText} </Text>
          <Octicons 
            name={this.state.isShowingMenu ? "triangle-up" : "triangle-down"}
            style={{margin:10}}
            color="white"
            size={15}
          />
          
        </TouchableOpacity>
      
        {this.state.isShowingMenu? 
        <View>
          <FlatList
            styles={{marginTop:5}}
            data={this.state.groups}
            keyExtractor={item => item.id.toString()}
            renderItem = {({item}) => 
              <TouchableOpacity
                onPress={()=>{
                  if (this.state.type === "manage" || this.state.type === "member")
                  {
                    this.props.navigation.navigate('group', {
                      title: item.name,
                      group: item,
                    });
                  }
                  else 
                  {
                    this.props.navigation.navigate('invitation', {
                      group: item,
                    }); // should add something here...
                  }
                }}
              >
                <Text style={styles.itemText}> {item.name} </Text>
              </TouchableOpacity>
              
            }

          />
        </View>:
        null
        }
        
      </View>
    );
  }
}

function HomeView({navigation}) {
  const DATA = [
    {
      menuText: "Groups you manage",
      type: "manage",
      groups: client.clientInfo.groupsInfo.filter(group => {return group.policy === POLICIES.OWNER || group.policy === POLICIES.ADMIN}),
    },

    {
      menuText: "Groups you're in",
      type: "member",
      groups: client.clientInfo.groupsInfo.filter(group => {return group.policy === POLICIES.MEMBER}),
    },

    {
      menuText: "Invitations",
      type: "invitation",
      groups: client.clientInfo.invitationsInfo,
    },
  ];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => 
        <TouchableOpacity
          onPress={() => {navigation.navigate('create-group')}}
          // onPress={() => navigation.navigate('info', {
          //   groupName: route.params.title,
          //   title: "Info: " + route.params.title,
          // })}
        >
          <AntDesgin
            name="addusergroup"
            size={25}
          />
        </TouchableOpacity>,

      headerRightContainerStyle: {padding: 15}
    
    });
  }, [navigation]);

  return (
    <View>
      <FlatList
        data={DATA}
        keyExtractor={item => item.type}
        renderItem={({item}) => 
          <DropDown
            menuText={item.menuText}
            type={item.type}
            groups={item.groups}
            navigation={navigation}
          />
        }
      />
    </View>
  );
}

function GroupView({route, navigation}) {
  const { group } = route.params;
  const tasks = group.tasks;

  const maxLengthForTitle = 15;
  const title  = route.params.title.length >  maxLengthForTitle ?
                  route.params.title.substring(0, maxLengthForTitle-3) + '...':
                  route.params.title;

  React.useLayoutEffect(() => {
    navigation.setOptions({

      headerTitle: title,

      headerRight: () => 
      <View style={{flexDirection:'row'}}>

        {/*add button*/}
        {
        (group.policy === POLICIES.OWNER || group.policy == POLICIES.ADMIN) &&
        <TouchableOpacity
          style={{marginRight:20}}
        >
          <MaterialIcons
            name={"add-circle-outline"}
            size={25}
          />

          
        </TouchableOpacity>
        }

        {/*info button*/}
        <TouchableOpacity
          onPress={() => navigation.navigate('info', {
            group: group,
            title: "Info: " + route.params.title,
          })}
        >
          <Octicons 
            name="info"
            size={25}
          />
        </TouchableOpacity>

        
      </View>,

      headerRightContainerStyle: {padding: 15}
    
    });
  }, [navigation]);

  // console.debug("tasks = ");
  // console.debug(tasks);

  return (
    <View style={{justifyContent:'flex-end'}}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => 
          <TouchableOpacity
            style={{
              backgroundColor: "#ffffff",
              padding:15,
              marginLeft:10,
              marginRight:10,
              marginBottom:5,
              borderRadius:5,
            }}
          >
          <View style={{flexDirection:'row', flex:1, alignItems:'center'}}>
            <Text style={{fontWeight:'bold', fontSize:16, flex:1}}> {item.name} </Text>
            <FontAwesome5 
              name = "circle"
              // fix this
              color={item.state==TASK_STATES.NOT_RELATED?"#acacac":item.state==TASK_STATES.NOT_DONE?"#fdd023":item.state==TASK_STATES.DONE?"#009900":"#000000"}
              style={{margin:10}}
              size={20}
            />
          </View>

          <View style={{flexDirection:'row', flex:1, alignItems:'center'}}>
            <FontAwesome5 
              name = "circle"
              color='#000000'
              style={{margin:10}}
              size={10}
            />
            <Text style={{}}> {item.dueDate} </Text>
          </View>

          <View style={{flexDirection:'row', flex:1, alignItems:'center'}}>
            <FontAwesome5 
              name = "circle"
              color = '#000000'
              style={{margin:10}}
              size={10}
            />
            <Text> {item.participants.map(user => {
              for(const userInGroup of group.users) {
                if (userInGroup.id === user.id)
                {
                  return userInGroup.name;
                }
              }
            }).toString()} </Text>
          </View>

          </TouchableOpacity>
        }
      />

    </View>
  );
}

function InfoView({route, navigation}) {

  const { group } = route.params;
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

            navigation.popToTop();
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
          members: group.users,
        })}
        style={localStyles.container}
      > 
        {/* <Text style={styles.menuText}> {"Members"} </Text>   */}
        <Text style={localStyles.item}> {"Members"} </Text>  
      </TouchableOpacity>

      {
      (group.policy === POLICIES.OWNER || group.policy == POLICIES.ADMIN) &&
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

function MemberView({route, navigation}) {
  const { members } = route.params;
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

  var policyRank = function(item) {
    switch (item.policy) {
      case POLICIES.OWNER:
        return 0;
      case POLICIES.ADMIN:
        return 1;
      case POLICIES.MEMBER:
        return 2;
    }
  }
  members.sort((a,b) => policyRank(a)-policyRank(b));

  return (
    // <Text>{JSON.stringify(members)}</Text>
    <View>
      <FlatList
        data={members}
        keyExtractor={item => item.name}
        renderItem={({item}) =>
        <View style={localStyles.container}> 
          <Text style={localStyles.nameText}> {item.name} </Text>
          <Text style={localStyles.policyText}> {item.policy} </Text>
        </View>}
      />
    </View>
  );
}

function InvitationView({route, navigation}) {
  const { group } = route.params;
  const localStyles = {
    infoContainer: {
      backgroundColor: '#ffffff',
      padding: 12,
      marginVertical: 5,
      marginHorizontal: 8,
      
      borderRadius: 5,
    },

    infoText: {
      color:'#000000', 
      fontFamily:'sans-serif-light', 
      fontSize: 24,
      marginLeft:8,
    },

    acceptContainter: {
      backgroundColor: '#00ff00',
      flex:1,
      padding: 12,
      marginVertical: 5,
      marginHorizontal: 8,
      alignItems:'center',
      
      borderRadius: 5,
    },

    denyContainer: {
      backgroundColor: '#ff0000',
      flex:1,
      padding: 12,
      marginVertical: 5,
      marginHorizontal: 8,
      alignItems:'center',
      
      borderRadius: 5,
    },

    confirmText: {
      color: '#ffffff',
      fontSize: 20,
    },
  };

  return(
    <View>
      <View
        style={localStyles.infoContainer}
      >
        <Text
          style={localStyles.infoText}
        >
          {group.name}
        </Text>
        <Text>{"Invitor: " + group.uName}</Text>
      </View>

      <View style={{flexDirection:'row'}}>
        <TouchableOpacity
          style={localStyles.denyContainer}
          onPress={() => {navigation.popToTop();}}
        >
          <Text style={localStyles.confirmText}>Deny</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={localStyles.acceptContainter}
          onPress={() => {navigation.popToTop();}}
        >
          <Text style={localStyles.confirmText}>Accept</Text>
        </TouchableOpacity>

        
      </View>
    </View>
  );
}

function AddGroupView({route, navigation}) {

  const [text, setText] = useState('');
  return (
    <View>
      <Text> Input IDs with spaces .... </Text>
      <TextInput 
        style={{height: 40, borderColor:'#000000', borderWidth: 2}}
        placeholder="IDs..."
        onChangeText={text => setText(text)}
        defaultValue={text}      
      />
      
      <Text> {text.split(' ').map(id=>id+'\n')} </Text>

    </View>
  );
}

const Stack = createStackNavigator();

class Groups extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      client: client,
    }
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  render() {
    const theme = this.props.customize.darkTheme ? colors.DarkBackground : colors.LightBackground;
    return (
      <View style={{ flex: 1, backgroundColor: theme}}>
        <Header title={"GROUPS"} />
        <Menu onPress={() => this.props.navigation.toggleDrawer()} />
        <Notice />

        <Stack.Navigator>
          <Stack.Screen 
            name="home" 
            component={HomeView} 
            options={{title:'Home'}}  
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
          />

          <Stack.Screen 
            name="members"
            component={MemberView}
            options={({route}) => ({
              title: route.params.title,
              members: route.params.members,
            })}
          />

          <Stack.Screen
            name="invitation"
            component={InvitationView}
            options={({route}) => ({
              title: 'Invitations'
            })}
          />

          <Stack.Screen
            name='create-group'
            component={AddGroupView}
            options={({route}) => ({
              title: 'Create a new group'
            })}

          />

          

        </Stack.Navigator>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e90ff',
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
    backgroundColor: '#1e90ff',
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
