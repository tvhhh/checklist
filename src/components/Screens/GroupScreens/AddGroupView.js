import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import { POLICIES, TASK_STATES, TEST_DATA, currentUserId } from '../../../utils/GroupEnum'

import { registerGroup } from '../../../redux/actions/GroupDataActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class AddGroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  onChangeName = text => {
    this.setState({ name: text });
  }

  handleSubmit = () => {
    this.props.registerGroup(this.props.userData.data.username, this.state.name);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View>
        <TextInput 
          onChangeText={this.onChangeName}
          defaultValue={this.state.name}
        />
        <TouchableOpacity style={{ backgroundColor: "black", height: 50, width: 50 }} onPress={this.handleSubmit} />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  userData: state.userData,
  groupData: state.groupData,
});

const mapDispatchToProps = dispatch => ({
  registerGroup: (username, name) => dispatch(registerGroup(username, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupView);

// class AddGroupForm extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       groupName: "",
//       textInput: [],
//       inputData: []
//     }
//   }

//   addTextInput = (index) => {
//     let textInput = this.state.textInput;
//     textInput.push(
//       <TextInput style={styles.textInput}
//         onChangeText={(text) => this.addValues(text, index)}
//         placeholder="Username"
//       />);
//     this.setState({textInput});
//   }

//   removeTextInput = () => {
//     let textInput = this.state.textInput;
//     let inputData = this.state.inputData;
//     textInput.pop()
//     inputData.pop()
//     this.setState({textInput, inputData})
//   }

//   addValues = (text, index) => {
//     let dataArray = this.state.inputData;
//     let checkBool = false;
//     if (dataArray.length !== 0) {
//       dataArray.forEach(element => {
//         if (element.index === index) {
//           element.text = text;
//           checkBool = true;
//         }
//       });
//     }
//     if (checkBool) {
//       this.setState({
//         inputData: dataArray
//       })
//     }
//     else {
//       dataArray.push({'text': text, 'index': index});
//       this.setState({
//         inputData: dataArray
//       })
//     }
//   }

//   handleSubmit = () => {
//     // // console.debug('Data', this.state.inputData)
//     // createGroup({
//     //   gid: "2",
//     //   name: this.state.name,
//     //   members: this.state.inputData,
//     // })

//     // let database = this.props.database;
//     // let newkey = "2"
//     // database.groups[newkey] = {
//     //   gid: newkey,
//     //   name: this.state.groupName,
//     //   owner: currentUserId,
//     //   admins: [currentUserId],
//     //   members: this.state.inputData.map(item => {
//     //     let uid = findUidFromUsername(item.text, database);
//     //     if (uid !== -1)
//     //     {
//     //       return uid;
//     //     }
//     //     else
//     //       console.debug(item.text + " does not exist !");
//     //   }),
//     //   tasks: [],
//     // }
//     // let groups = database.users[currentUserId].groups
//     // groups.push(newkey);
//     // database.groups[newkey].members.forEach(uid => {
//     //   if (uid in database.users) {
//     //     database.users[uid].groups.push(newkey);
//     //   }
//     //   else {
//     //     console.debug(uid + "does not exist !");
//     //   }
//     // })
//     // console.debug('after add');
//     // console.debug(database.users);
//     // console.debug(database.groups);
//     this.props.navigation.navigate('home', {database: database});

//   }

//   render() {
//     return (
//       <ScrollView> 
//         <View>
//           <TextInput style={styles.textInput}
//             onChangeText={(text) => this.setState({groupName: text})}
//             placeholder="Group name"
//           />
//         </View>

//         <View style={styles.row}> 
//           <View style={{margin: 10}}>
//             <Button title='add more member' onPress={() => this.addTextInput(this.state.textInput.length)}/>
//           </View>
//           <View style={{margin: 10}}>
//             <Button title='Remove' onPress={() => this.removeTextInput()} />
//           </View>
//         </View>

        
//         <View style={{margin: 10}}>
//           {this.state.textInput.map((value) => {
//             return value
//           })}
//           <Button title='Submit' onPress={() => this.handleSubmit()} />
//         </View>
//       </ScrollView>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonView: {
  flexDirection: 'row'
  },
  textInput: {
  height: 40,
  borderColor: 'black', 
  borderWidth: 1,
  margin: 10,
  padding: 10,
},
row:{
  flexDirection: 'row',
  justifyContent: 'center'
  },
}

);

