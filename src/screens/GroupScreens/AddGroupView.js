import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';

import { registerGroup } from '../../redux/actions/GroupDataActions'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from '../../styles/colors';


export class AddGroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  renderHeader(title) {
    const displayTitle = title;

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
          onPress={() => {this.props.navigation.goBack()}}
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
        >{`${displayTitle}`}</Text>
      </View>
    ); 
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
      <View
        style={{
          flex:1,
          backgroundColor: this.props.customize.theme.Background,
        }}
      >
        {this.renderHeader("Create new group")}
        <TextInput 
          style={{
            ...styles.textInput,
            color: this.props.customize.theme.PrimaryText, 
            fontSize: this.props.customize.fontSize.PrimaryText, 
            fontFamily: this.props.customize.font,
            borderColor: this.props.customize.theme.TitleText,
          }}
          onChangeText={this.onChangeName}
          defaultValue={this.state.name}
          placeholder={"Group name"}
          placeholderTextColor={this.props.customize.theme.SecondaryText}
        />
        <TouchableOpacity 
          style={{
            ...styles.submitButton,
            backgroundColor: this.props.customize.theme.Overlay,
          }} 
          onPress={this.handleSubmit} 
        > 
          <Text
            style={{
              ...styles.menuText,
              color: this.props.customize.theme.TitleText, 
              fontSize: this.props.customize.fontSize.TitleText, 
              fontFamily: this.props.customize.font,
            }}
          >
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  userData: state.userData,
  groupData: state.groupData,
  customize: state.customize,
});

const mapDispatchToProps = dispatch => ({
  registerGroup: (username, name) => dispatch(registerGroup(username, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupView);

const styles = StyleSheet.create({
  header: {
    flexDirection:'row',
    padding: 20,
    textAlign: 'center',
    fontSize: 30,
  },
  textInput: {
    height: 40,
    borderColor: colors.Border, 
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  menuText: {
    padding: 5,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginTop: 10,
    marginHorizontal: 8,
    borderRadius: 20,
  }, 
});
