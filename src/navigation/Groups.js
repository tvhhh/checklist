import React from 'react';
import { Dimensions, ScrollView, View, Text, EventSubscriptionVendor, TouchableOpacity, SectionList, FlatList, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import NoticeBox from '../components/Notification/index';
import Button from '../components/Button/index';
import colors from '../styles/colors';
import Header from '../components/Header/index';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {StackNavigator} from 'react-navigation'
import { createStackNavigator } from '@react-navigation/stack';
import { switchCase } from '@babel/types';

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

class User {
  static UID = 0;
  constructor(name) {
    this.name = name;
    this.groups = []; // id and user policy
    this.tasks = []; // task
  }

  addGroup(groupId, policy) {
    this.groups.push({groupId: groupId, policy: policy});
  }

  removeGroup(groupId) {
    this.groups = this.groups.filter(item=>item.groupId != groupId);
  }

  addTask(task, groupId) {
    // send request to server ? 
  }
}

class GroupTask {
  constructor(name, description, dueTime, participants) {
    this.name = name;
    this.description = description;
    this.dueTime = dueTime;
    this.participants = participants;
  }
}

class Group {
  constructor(name) {
    this.name = name; // string
    this.users = []; // id and policy
    this.pendingUsers = []; // id
  }
}

const DATA = [
  {
    title: "Groups you manage",
    data: [
      "group1", "group2", "group3", 
    ],
  },

  {
    title: "Groups you're in",
    data: [
      "group1", "group2", "group3", "group4", 
    ],
  },

  {
    title: "Invitations",
    data: [
      "group1", "group2",
    ],
  },
]

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuText: this.props.menuText,
      menu: [
        {
          key: 'It has a name now',
          tasks: [
            {
              key: '0',
              name: 'Go Pro',
              state: TASK_STATES.DONE,
              description: 'abcxyz ?',
              dueTime: '11:59',
              dueDate: '22/22/2022',
              participants: ['khoa', 'khoa2', 'another khoa'],
            },

            {
              key: '1',
              name: 'update UI',
              state: TASK_STATES.NOT_DONE,
              description: 'do it!',
              dueTime: '23:01',
              dueDate: '01/22/2022',
              participants: ['captain','niatpac'],
            },

            {
              key: '2',
              name: 'Try not to starve',
              state: TASK_STATES.NOT_RELATED,
              description: 'plz',
              dueTime: '00:00',
              dueDate: '01/01/2022',
              participants: ['wes'],
            },

            {
              key: '3',
              name: 'ABC',
              state: TASK_STATES.NOT_RELATED,
              description: '?',
              dueTime: '00:00',
              dueDate: '01/01/2022',
              participants: ['someone'],
            },

          ],
        },
        {key: 'group2'},
        {key: 'group3'},
        {key: 'group4'},
        {key: 'group5'},
        {key: 'group6'},
        {key: 'group7'},
        {key: 'group8'},
        {key: 'group9'},
        {key: 'group10'},
        {key: 'group11'},
        {key: 'group12'},
        {key: 'group13'},
        {key: 'group14'},

      ],

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
          <Text style={styles.menuText}> {this.state.menuText} + {this.state.isShowingMenu===true?'1':'0'} </Text>
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
            data={this.state.menu}
            renderItem = {({item}) => 
              <TouchableOpacity
                onPress={()=>{
                  this.props.navigation.navigate('Group', {
                    title: item.key,
                    tasks: item.tasks,
                  });
                }}
              >
                <Text style={styles.itemText}> {item.key} </Text>
              </TouchableOpacity>
              
            }

          />
        </View>:
        <View></View>
        }
        
      </View>
    );
  }
}

function HomeView({navigation}) {
  return (
    <View>
      <SectionList 
        sections={DATA}
        keyExtractor={(item, index) => item+index}
        renderItem={({item})=> <View />}
        renderSectionHeader={({section: {title}})=> (
          <DropDown 
            menuText={title}
            navigation={navigation}  
          />
        )}
      />
    </View>
  );
}

function GroupView({route, navigation}) {
  const { tasks } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => 
        <TouchableOpacity
          onPress={() => navigation.navigate('info', {
            groupName: route.params.title,
            title: "Info: " + route.params.title,
          })}
        >
          <Octicons 
            name="info"
            size={25}
          />
        </TouchableOpacity>,

      headerRightContainerStyle: {padding: 15}
    
    });
  }, [navigation]);

  
  return (
    <View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => 
          <TouchableOpacity
            style={{
              backgroundColor:'#ffffff',
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
            <Text> {item.participants.toString()} </Text>
          </View>

          </TouchableOpacity>
        }
      />

      <Button.Create />

    </View>
  );
}

function InfoView({route, navigation}) {

  const { groupName } = route.params;
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
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('members', {
          title: 'Members: ' + groupName,
          members: [
            {name:'khoa', policy:POLICIES.OWNER},
            {name:'hung', policy:POLICIES.ADMIN},
            {name:'huy', policy:POLICIES.ADMIN},
            {name:'huan', policy:POLICIES.ADMIN},
            {name:'hoang', policy:POLICIES.ADMIN},
            {name:'hieu', policy:POLICIES.ADMIN},
            {name:'a ghost ?', policy:POLICIES.MEMBER},
            {name:'red', policy:POLICIES.MEMBER},
            {name:'green', policy:POLICIES.MEMBER},
            {name:'blue', policy:POLICIES.MEMBER},
            {name:'white', policy:POLICIES.MEMBER},
          ],
        })}
        style={localStyles.container}
      > 
        {/* <Text style={styles.menuText}> {"Members"} </Text>   */}
        <Text style={localStyles.item}> {"Members"} </Text>  
      </TouchableOpacity>

      <TouchableOpacity
        style={localStyles.container}
      > 
        <Text style={localStyles.item}> {"Add more people"} </Text>  
      </TouchableOpacity>

      <TouchableOpacity
        style={localStyles.container}
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

const Stack = createStackNavigator();
``
export default class Groups extends React.Component {
  constructor (props) {
    super(props);
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Header title={"GROUPS"} />
        <Button.Menu onPress={() => this.props.navigation.toggleDrawer()} />
        <Button.Notice />

        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeView} 
            options={{title:'Home'}}  
          />

          <Stack.Screen 
            name="Group" 
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

        </Stack.Navigator>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#1e90ff',
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginLeft: 8,
    marginRight: 8,
    
    borderRadius: 5,
  },
  
  menuText: {
    color: '#ffffff',
    // backgroundColor: '#1e90ff',
    fontFamily: "sans-serif-light",
    fontSize: 20,
    paddingVertical: 8,
    paddingLeft: 20,
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
