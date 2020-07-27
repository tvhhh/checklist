import React from 'react'
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { extractDateTime, extractDate } from '../../../utils/DateTime';
import {POLICIES, TASK_STATES, TEST_DATA, currentUserId} from '../../../utils/GroupEnum'
import { connect } from 'react-redux'

import TaskList, { FILTER_GROUP_TASKS } from '../../TaskList'

class GroupView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gid: this.props.route.params.gid,
      group: this.props.groupData.filter(group => group.gid === this.props.route.params.gid)[0],
    }
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
          onPress={() => {this.props.navigation.goBack()}}
        >
          <MaterialIcons
            name={"arrow-back"}
            size={25}
            color={this.props.customize.theme.TitleText}
          />
        </TouchableOpacity>


        {/* Title: group name */}
        <Text
          style={
            {
              color: this.props.customize.theme.TitleText, 
              fontSize: this.props.customize.fontSize.TitleText, 
              fontFamily: this.props.customize.font,
              flex: 8,
              
            }
          }
        >{displayTitle}</Text>

        {/* add button */}
        {/* <TouchableOpacity
          style={
            {
              marginRight:20,
              flex:1,
            }
          }
        >
          <MaterialIcons
            name={"add-circle-outline"}
            size={25}
            color={this.props.customize.theme.PrimaryText}
          />
        </TouchableOpacity> */}

        {/* info button */}
        <TouchableOpacity
          style={
            {
              flex:1,
            }
          }
          onPress={() => {this.props.navigation.navigate('info',{gid: this.props.route.params.gid})}}
        >
          <Octicons 
            name="info"
            size={25}
            color={this.props.customize.theme.PrimaryText}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const group = this.props.groupData.filter(group => group.gid === this.props.route.params.gid)[0];
    return (
      <View
        style={{
            flex: 1,
            backgroundColor: this.props.customize.theme.Background,
        }}
      >
        {this.renderHeader(group? group.name: "nothing goes here")}
        <TaskList 
          filterOption={FILTER_GROUP_TASKS}
          group={group}
          create={true}
        />

        
      </View>
    );
  }
}

const mapStateToProps = state => ({
  groupData: state.groupData,
  userData: state.userData,
  customize: state.customize,
});

export default connect(mapStateToProps)(GroupView);

const styles = StyleSheet.create({
  header: {
    flexDirection:'row',
    padding: 20,
    justifyContent:'center',
    backgroundColor: '#ffffff',
    color: '#ffffff',
    fontSize: 30,
  },

});

// export function GroupViewOld({route, navigation}) {
//   const { group, policy, database } = route.params;
//   const tasks = group.tasks;

//   const maxLengthForTitle = 15;
//   const title  = route.params.title.length >  maxLengthForTitle ?
//                   route.params.title.substring(0, maxLengthForTitle-3) + '...':
//                   route.params.title;

  

//   React.useLayoutEffect(() => {
//     navigation.setOptions({

//       headerTitle: title,

//       headerRight: () => 
//       <View style={{flexDirection:'row'}}>

//         {/*add button*/}
//         {
//         (group.policy === POLICIES.OWNER || group.policy == POLICIES.ADMIN) &&
//         <TouchableOpacity
//           style={{marginRight:20}}
//         >
//           <MaterialIcons
//             name={"add-circle-outline"}
//             size={25}
//           />

          
//         </TouchableOpacity>
//         }

//         {/*info button*/}
//         <TouchableOpacity
//           onPress={() => navigation.navigate('info', {
//             group: group,
//             policy: policy,
//             title: "Info: " + route.params.title,
//           })}
//         >
//           <Octicons 
//             name="info"
//             size={25}
//           />
//         </TouchableOpacity>

        
//       </View>,

//       headerRightContainerStyle: {padding: 15}
    
//     });
//   }, [navigation]);

//   // console.debug("tasks = ");
//   // console.debug(tasks);

//   return (
//     <View style={{justifyContent:'flex-end'}}>
//       {/* <Text>
//         {JSON.stringify(tasks)}
//       </Text> */}
      
//       <FlatList
//         data={tasks}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => 
//           <TouchableOpacity
//             style={{
//               backgroundColor: "#ffffff",
//               padding:15,
//               marginLeft:10,
//               marginRight:10,
//               marginBottom:5,
//               borderRadius:5,
//             }}
//           >
//           <View style={{flexDirection:'row', flex:1, alignItems:'center'}}>
//             <Text style={{fontWeight:'bold', fontSize:16, flex:1}}> {item.title} </Text>

//             {/* <FontAwesome5 
//               name = "circle"
//               // fix this
//               color={item.state===TASK_STATES.NOT_RELATED?"#acacac":item.state==TASK_STATES.NOT_DONE?"#fdd023":item.state===TASK_STATES.DONE?"#009900":"#000000"}
//               style={{margin:10}}
//               size={20}
//             /> */}
//           </View>

//           <View style={{flexDirection:'row', flex:1, alignItems:'center'}}>
//             <FontAwesome5 
//               name = "circle"
//               color='#000000'
//               style={{margin:10}}
//               size={10}
//             />
//             <Text style={{}}> {JSON.stringify(item.dueTime)} </Text>
//           </View>

//           </TouchableOpacity>
//         }
//       />

//     </View>
//   );
// }