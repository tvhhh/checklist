import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { connect } from 'react-redux';

import { ErrorBox, NoInternetAlert } from './LogIn';

import screenStyles from './ScreenStyles';
import colors from '../../styles/colors';

import { createUser, isUsernameExisting, isEmailExisting } from '../../api';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        email: "",
        password: "",
        confirmedPassword: "",
      },
      errorText: "",
      error: false,
      alert: false,
    };
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  onChangeUserName = text => {
    this.setState({ user: { ...this.state.user, username: text } });
  }

  onChangeEmail = text => {
    this.setState({ user: { ...this.state.user, email: text } });
  }

  onChangePassword = text => {
    this.setState({ user: { ...this.state.user, password: text } });
  }

  onConfirmPassword = text => {
    this.setState({ user: { ...this.state.user, confirmedPassword: text } });
  }

  checkEmptyEntry = () => {
    return (this.state.user.username.trim() === "" || this.state.user.password.trim() === "");
  }

  checkInvalidEmail = (email) => {
    var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(format) === null;
  }

  checkUnmatchedPassword = (password, confirmedPassword) => {
    return password !== confirmedPassword;
  }

  clearAllInput = () => {
    this.setState({
      user: {
        username: "",
        email: "",
        password: "",
        confirmedPassword: "",
      },
    });
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
    } else if (await isUsernameExisting(this.state.user.username)) {
      this.setState({ error: true, errorText: "Sorry, this username has existed." });
    } else if (await isEmailExisting(this.state.user.email)) {
      this.setState({ error: true, errorText: "Sorry, this email has existed." })
    } else if (this.checkEmptyEntry()) {
      this.setState({ error: true, errorText: "Please don't leave any field empty." });
    } else if (this.checkInvalidEmail(this.state.user.email)) {
      this.setState({ error: true, errorText: "Invalid email." });
    } else if (this.checkUnmatchedPassword(this.state.user.password, this.state.user.confirmedPassword)) {
      this.setState({ error: true, errorText: "Unmatched password, please make sure you input correctly." });
    } else {
      var data = this.state.user;
      delete data.confirmedPassword;
      createUser(data);
      this.clearAllInput();
      this.props.navigation.goBack();
    }
  }
  
  render() {
    const theme = this.props.customize.darkTheme ? colors.DarkBackground : colors.LightBackground;
    const textColor = this.props.customize.darkTheme ? colors.DarkPrimaryText : colors.LightPrimaryText;
    const text2ndColor = this.props.customize.darkTheme ? colors.DarkSecondaryText : colors.LightSecondaryText;
    const overlayBorderColor = this.props.customize.darkTheme ? colors.DarkOverlay : colors.LightOverlay;
    const fontSize = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[screenStyles.screenContainer, styles.container, {backgroundColor: theme}]}>
          <Text style={[styles.title, {color: textColor, fontFamily: font, fontSize: fontSize}]}>SIGN UP</Text>
          <View style={styles.inputField}>
            <Text style={[styles.inputTitle, {color: textColor, fontFamily: font, fontSize: fontSize}]}>Username</Text>
            <TextInput style={[styles.input, {color: textColor, fontFamily: font, fontSize: fontSize}]}
              placeholder="Enter username"
              placeholderTextColor={text2ndColor}
              onChangeText={this.onChangeUserName}
              defaultValue={this.state.username}
              onFocus={this.turnOffError}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputField}>
            <Text style={[styles.inputTitle, {color: textColor, fontFamily: font, fontSize: fontSize}]}>Email</Text>
            <TextInput style={[styles.input, {color: textColor, fontFamily: font, fontSize: fontSize}]}
              placeholder="Enter email"
              placeholderTextColor={text2ndColor}
              onChangeText={this.onChangeEmail}
              defaultValue={this.state.email}
              onFocus={this.turnOffError}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputField}>
            <Text style={[styles.inputTitle, {color: textColor, fontFamily: font, fontSize: fontSize}]}>Password</Text>
            <TextInput style={[styles.input, {color: textColor, fontFamily: font, fontSize: fontSize}]}
              placeholder="Enter password"
              placeholderTextColor={text2ndColor}
              onChangeText={this.onChangePassword}
              defaultValue={this.state.password}
              onFocus={this.turnOffError}
              secureTextEntry={true}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputField}>
            <Text style={[styles.inputTitle, {color: textColor, fontFamily: font, fontSize: fontSize}]}>Confirm password</Text>
            <TextInput style={[styles.input, {color: textColor, fontFamily: font, fontSize: fontSize}]}
              placeholder="Re-enter password"
              placeholderTextColor={text2ndColor}
              onChangeText={this.onConfirmPassword}
              defaultValue={this.state.confirmedPassword}
              onFocus={this.turnOffError}
              secureTextEntry={true}
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={this.handleSubmit}
          >
            <Text style={[styles.submitText, {color: textColor, fontFamily: font, fontSize: fontSize}]}>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.otherOptionsButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={[styles.otherOptionsText, {color: textColor, fontFamily: font, fontSize: fontSize}]}>Back to Login</Text>
          </TouchableOpacity>
          {this.state.error ? <ErrorBox error={this.state.errorText} /> : null}
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
    paddingVertical: 5,
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
  otherOptionsButton: {
    paddingHorizontal: 5,
  },
  otherOptionsText: {
    color: colors.PrimaryColor,
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
    fontSize: 14,
  },
  alertBox: {
    height: 150,
    width: 300,
    borderRadius: 5,
  },
});

const mapStateToProps = state => ({
  appData: state.userData,
  customize: state.customize,
});

export default connect(mapStateToProps)(SignUp);
