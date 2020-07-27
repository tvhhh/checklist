import React from 'react'
import {View, Button, ScrollView, TextInput, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'

import { bindActionCreators } from 'redux';
import {connect } from 'react-redux'
import colors from '../../../styles/colors'
import { addUserToGroupAsync } from '../../../redux/actions/GroupDataActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
class AddMemberView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: this.props.groupData.filter(group => group.gid === this.props.route.params.gid)[0],
      textInput: [],
      inputData: [],
    };
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
        >{`Add users: ${displayTitle}`}</Text>
      </View>
    ); 
  }

  addTextInput = (index) => {
    let textInput = this.state.textInput;
    textInput.push(
      <TextInput 
        style={{
          ...styles.textInput,
          color: this.props.customize.theme.PrimaryText, 
          fontSize: this.props.customize.fontSize.PrimaryText, 
          fontFamily: this.props.customize.font,
          borderColor:this.props.customize.theme.PrimaryText,
        }}
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
    const group = this.props.groupData.filter(group => group.gid === this.props.route.params.gid)[0];
    return (
      <ScrollView
        style={{
          flex:1,
          backgroundColor: this.props.customize.theme.Background,
        }}
      > 
        {this.renderHeader(group.name)}
        <View style={styles.row}> 
          <View style={{margin: 10}}>
            <TouchableOpacity
              style={{
                ...styles.container,
                backgroundColor: this.props.customize.theme.Overlay,
              }}
              onPress={() => this.addTextInput(this.state.textInput.length)}
            >
              <Text
                style={{
                  ...styles.menuText,
                  color: this.props.customize.theme.TitleText, 
                  fontSize: this.props.customize.fontSize.TitleText, 
                  fontFamily: this.props.customize.font 
                }}
              > 
                {"Add user"}
              </Text>
            </TouchableOpacity>
            {/* <Button title='add more member' onPress={() => this.addTextInput(this.state.textInput.length)}/> */}
          </View>
          <View style={{margin: 10}}>
            <TouchableOpacity
              style={{
                ...styles.container,
                backgroundColor: this.props.customize.theme.Overlay,
              }}
              onPress={() => this.removeTextInput()}
            >
              <Text
                style={{
                  ...styles.menuText,
                  color: this.props.customize.theme.TitleText, 
                  fontSize: this.props.customize.fontSize.TitleText, 
                  fontFamily: this.props.customize.font 
                }}
              > 
                {"Remove"}
              </Text>
            </TouchableOpacity>
            {/* <Button title='Remove' onPress={() => this.removeTextInput()} /> */}
          </View>
        </View>

        
        <View style={{margin: 10}}>
          {this.state.textInput.map((value) => {
            return value
          })}
          <TouchableOpacity
            style={{
              ...styles.container,
              backgroundColor: this.props.customize.theme.Overlay,
            }}
            onPress={() => this.handleSubmit()}
          >
            <Text
              style={{
                ...styles.menuText,
                color: this.props.customize.theme.TitleText, 
                fontSize: this.props.customize.fontSize.TitleText, 
                fontFamily: this.props.customize.font,
                
              }}
            > 
              {"Submit"}
            </Text>
          </TouchableOpacity>
          {/* <Button title='Submit' onPress={() => this.handleSubmit()} /> */}
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
    padding: 5,
    marginTop: 10,
    marginHorizontal: 8,
    borderRadius: 20,
  }, 
  menuText: {
    paddingVertical: 8,
    marginLeft: 8,
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
