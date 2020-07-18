import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../Header';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import screenStyles from './ScreenStyles';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { logIn, getData } from '../../redux/actions/UserDataActions';


export class ErrorBox extends React.Component {
  render() {
    return (
      <View style={styles.errorBox}>
        <Text style={styles.errorText}>{this.props.error}</Text>
      </View>
    );
  }
};

export class NoInternetAlert extends React.Component {
  render() {
    return (
      <View style={styles.alertContainer}>
        <MaterialCommunityIcons name="wifi-off" size={60} color={colors.DisabledColor} />
        <Text style={styles.alertText}>NO INTERNET CONNECTION</Text>
      </View>
    );
  }
};

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: false,
      alert: false,
    };
  }

  onChangeUserName = text => {
    this.setState({ username: text });
  }

  onChangePassword = text => {
    this.setState({ password: text });
  }

  turnOffError = () => {
    this.setState({ error: false });
  }

  toggleAlert = () => {
    this.setState({ alert: !this.state.alert });
  }

  handleSubmit = async () => {
    if (!this.props.appData.connection) {
      this.setState({ alert: true });
    } else {
      const data = await this.props.logIn(this.state.username, this.state.password);
      if (data === null) {
        this.setState({ error: true });
      } else {
        this.props.getData(data);
      }
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
                onFocus={this.turnOffError}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputTitle}>Password</Text>
              <TextInput style={styles.input}
                placeholder="Enter password"
                onChangeText={this.onChangePassword}
                defaultValue={this.state.password}
                onFocus={this.turnOffError}
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
            {this.state.error ? <ErrorBox error="Username or password is incorrect" /> : null}
          </View>
          <Overlay
            isVisible={this.state.alert}
            onBackdropPress={this.toggleAlert}
            overlayStyle={styles.alertBox}
          >
            <NoInternetAlert />
          </Overlay>
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
    fontSize: fonts.HeavyText,
    fontWeight: "bold",
  },
  inputField: {
    alignSelf: "stretch",
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  inputTitle: {
    color: colors.TitleText,
    fontSize: fonts.TitleText,
    marginBottom: 5,
  },
  input: {
    fontSize: fonts.PrimaryText,
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
    fontSize: fonts.ButtonText,
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
    fontSize: fonts.SecondaryText,
  },
  signUp: {
    color: colors.PrimaryColor,
    fontSize: fonts.SecondaryText,
  },
  errorBox: {
    backgroundColor: colors.ErrorText,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
  },
  errorText: {
    color: "white",
    fontSize: fonts.ErrorText,
  },
  alertBox: {
    height: 150,
    width: 300,
    borderRadius: 5,
  },
  alertContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  alertText: {
    color: colors.DisabledColor,
    fontSize: fonts.CaptionText,
    marginTop: 10,
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
