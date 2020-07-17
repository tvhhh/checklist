import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../Header';

import screenStyles from './ScreenStyles';
import colors from '../../styles/colors';

import { logIn, getData } from '../../redux/actions/UserDataActions';


class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: false,
    };
  }

  onChangeUserName = text => {
    this.setState({ username: text });
  }

  onChangePassword = text => {
    this.setState({ password: text });
  }

  turnOffAlert = () => {
    this.setState({ error: false });
  }

  handleSubmit = async () => {
    const data = await this.props.logIn(this.state.username, this.state.password);
    if (data === null) {
      this.setState({ error: true });
    } else {
      this.props.getData(data);
    }
  }
  
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={screenStyles.screenContainer}>
          <Header navigation={this.props.navigation} />
          <View style={styles.container}>
            <Text style={styles.title}>SIGN IN</Text>
            <View style={styles.inputField}>
              <Text style={styles.inputTitle}>Username</Text>
              <TextInput style={styles.input}
                placeholder="Enter username"
                onChangeText={this.onChangeUserName}
                defaultValue={this.state.username}
                onFocus={this.turnOffAlert}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputTitle}>Password</Text>
              <TextInput style={styles.input}
                placeholder="Enter password"
                onChangeText={this.onChangePassword}
                defaultValue={this.state.password}
                onFocus={this.turnOffAlert}
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={this.handleSubmit}
            >
              <Text style={styles.submitText}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.otherOptions}>
              <TouchableOpacity style={styles.otherOptionsButton}>
                <Text style={styles.resetPassword}>Forgot password?</Text>
              </TouchableOpacity>
              <Text>|</Text>
              <TouchableOpacity 
                style={styles.otherOptionsButton}
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                <Text style={styles.signUp}>Sign up</Text>
              </TouchableOpacity>
            </View>
            {this.state.error ?
              <View style={styles.alertBox}>
                <Text style={styles.alertText}>Username or password is incorrect</Text>
              </View> : null
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.PrimaryColor,
    fontSize: 30,
    fontWeight: "bold",
  },
  inputField: {
    alignSelf: "stretch",
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  inputTitle: {
    color: colors.TitleText,
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderColor: colors.Border,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  submitButton: {
    backgroundColor: colors.SecondaryColor,
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: 5,
    marginHorizontal: 40,
    marginVertical: 15,
    paddingVertical: 5,
  },
  submitText: {
    color: "white",
    fontSize: 20,
  },
  otherOptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  otherOptionsButton: {
    paddingHorizontal: 5,
  },
  resetPassword: {
    color: colors.SecondaryColor,
  },
  signUp: {
    color: colors.PrimaryColor,
  },
  alertBox: {
    backgroundColor: colors.ErrorText,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
  },
  alertText: {
    color: "white",
    fontSize: 14,
  },
});

const mapStateToProps = state => ({
  appData: state.userData,
});

const mapDispatchToProps = dispatch => ({
  logIn: (username, password) => dispatch(logIn(username, password)),
  getData: bindActionCreators(getData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
