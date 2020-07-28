import React from 'react'
import {View, Button, ScrollView, TextInput, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'

import { bindActionCreators } from 'redux';
import {connect } from 'react-redux'
import colors from '../../../styles/colors'
import { addUserToGroupAsync } from '../../../redux/actions/GroupDataActions';

class AddMemberView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: this.props.route.params.group,
      textInput: [],
      inputData: [],
    };
  }

  renderHeader() {
    return (
      <View>

      </View>
    );
  }

  addTextInput = (index) => {
    let textInput = this.state.textInput;
    textInput.push(
      <TextInput style={styles.textInput}
        onChangeText={(text) => this.addValues(text, index)}
        placeholder="Username"
        key={index}
      />);
    this.setState({textInput});
  }

  removeTextInput = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    textInput.pop()
    inputData.pop()
    this.setState({textInput, inputData})
  }

  addValues = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach(element => {
        if (element.index === index) {
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputData: dataArray
      })
    }
    else {
      dataArray.push({'text': text, 'index': index});
      this.setState({
        inputData: dataArray
      })
    }
  }

  handleSubmit = () => {
    console.debug('in handle submit, add more member');
    let inputData = this.state.inputData;

    console.debug(inputData);
    inputData.forEach(item => {
      console.debug('begin for each');
      let username = item.text;
      this.props.addUserToGroupAsync(username, this.state.group.gid);
      console.debug('end for each');
      
      // return item;
    })
    this.props.navigation.goBack();
    console.debug('END in handle submit, add more member');
  }

  render() {
    return (
      <ScrollView> 
        <View style={styles.row}> 
          <View style={{margin: 10}}>
            <Button title='add more member' onPress={() => this.addTextInput(this.state.textInput.length)}/>
          </View>
          <View style={{margin: 10}}>
            <Button title='Remove' onPress={() => this.removeTextInput()} />
          </View>
        </View>

        
        <View style={{margin: 10}}>
          {this.state.textInput.map((value) => {
            return value
          })}
          <Button title='Submit' onPress={() => this.handleSubmit()} />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  customize: state.customize,
  userData: state.userData,
  groupData: state.groupData,
});

const mapDispatchToProps = (dispatch) => ({
  addUserToGroupAsync: (username, gid) => dispatch(addUserToGroupAsync(username, gid)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberView)

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
});
