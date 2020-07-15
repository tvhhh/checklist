import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';

import screenStyles from './ScreenStyles';
import colors from '../../styles/colors';

import { fetchData } from '../../redux/actions/UserDataActions';
import { authorize, storeUsername } from '../../api';


class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: false,
    };
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
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
    if (await authorize(this.state.username, this.state.password)) {
      await storeUsername(this.state.username);
      this.props.fetchData();
    } else {
      this.setState({ error: false });
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
          <Text style={[styles.title, {color: textColor, fontFamily: font, fontSize: fontSize}]}>SIGN IN</Text>
          <View style={styles.inputField}>
            <Text style={[styles.inputTitle, {color: textColor, fontFamily: font, fontSize: fontSize}]}>Username</Text>
            <TextInput style={[styles.input, {color: textColor, fontFamily: font, fontSize: fontSize}]}
              placeholder="Enter username"
              placeholderTextColor={text2ndColor}
              onChangeText={this.onChangeUserName}
              defaultValue={this.state.username}
              onFocus={this.turnOffAlert}
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
              onFocus={this.turnOffAlert}
              secureTextEntry={true}
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={this.handleSubmit}
          >
            <Text style={[styles.submitText, {color: textColor, fontFamily: font, fontSize: fontSize}]}>LOGIN</Text>
          </TouchableOpacity>
          <View style={styles.otherOptions}>
            <TouchableOpacity style={styles.otherOptionsButton}>
              <Text style={[styles.resetPassword, {color: textColor, fontFamily: font, fontSize: fontSize}]}>Forgot password?</Text>
            </TouchableOpacity>
            <Text>|</Text>
            <TouchableOpacity 
              style={styles.otherOptionsButton}
              onPress={() => this.props.navigation.navigate("SignUp")}
            >
              <Text style={[styles.signUp, {color: textColor, fontFamily: font, fontSize: fontSize}]}>Sign up</Text>
            </TouchableOpacity>
          </View>
          {(this.state.error) ? 
            <View style={styles.alertBox}>
              <Text style={[styles.alertText, {color: textColor, fontFamily: font, fontSize: fontSize}]}>Username or password is incorrect</Text>
            </View> : null
          }
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
    paddingHorizontal: 10,
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
  customize: state.customize,
  appData: state.userData,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
