import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../Header';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../styles/colors';

import { logIn, getData } from '../../redux/actions/UserDataActions';


export class ErrorBox extends React.Component {
  render() {
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <View style={styles.errorBox}>
        <Text style={[styles.errorText, {fontSize: fonts.ErrorText, fontFamily: font}]}>{this.props.error}</Text>
      </View>
    );
  }
};

export class NoInternetAlert extends React.Component {
  render() {
    const theme = this.props.customize.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <View style={[styles.alertContainer, { backgroundColor: theme.Overlay }]}>
        <MaterialCommunityIcons name="wifi-off" size={60} color={colors.DisabledColor} />
        <Text style={[styles.alertText, {fontSize: fonts.CaptionText, fontFamily: font}]}>NO INTERNET CONNECTION</Text>
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
    const theme = this.props.customize.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: theme.Background }}>
          <Header navigation={this.props.navigation} />
          <View style={styles.container}>
          <Text style={[styles.title, {fontFamily: font, fontSize: fonts.HeavyText}]}>SIGN IN</Text>
            <View style={styles.inputField}>
              <Text style={[styles.inputTitle, {color: theme.TitleText, fontFamily: font, fontSize: fonts.TitleText}]}>Username</Text>
              <TextInput style={[styles.input, {color: theme.PrimaryText, fontFamily: font, fontSize: fonts.PrimaryText}]}
                placeholder="Enter username"
                placeholderTextColor={theme.SecondaryText}
                onChangeText={this.onChangeUserName}
                defaultValue={this.state.username}
                onFocus={this.turnOffError}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputField}>
              <Text style={[styles.inputTitle, {color: theme.TitleText, fontFamily: font, fontSize: fonts.TitleText}]}>Password</Text>
              <TextInput style={[styles.input, {color: theme.PrimaryText, fontFamily: font, fontSize: fonts.PrimaryText}]}
                placeholder="Enter password"
                placeholderTextColor={theme.SecondaryText}
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
              <Text style={[styles.submitText, {fontFamily: font, fontSize: fonts.ButtonText}]}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.otherOptions}>
              <TouchableOpacity style={styles.otherOptionsButton}>
                <Text style={[styles.resetPassword, {fontFamily: font, fontSize: fonts.SecondaryText}]}>Forgot password?</Text>
              </TouchableOpacity>
              <Text>|</Text>
              <TouchableOpacity 
                style={styles.otherOptionsButton}
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                <Text style={[styles.signUp, {fontFamily: font, fontSize: fonts.SecondaryText}]}>Sign up</Text>
              </TouchableOpacity>
            </View>
            {this.state.error ? 
              <ErrorBox 
                error="Username or password is incorrect"
                customize={this.props.customize}
              /> : null
            }
          </View>
          <Overlay
            isVisible={this.state.alert}
            onBackdropPress={this.toggleAlert}
            overlayStyle={styles.alertBox}
          >
            <NoInternetAlert customize={this.props.customize} />
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
    fontWeight: "bold",
  },
  inputField: {
    alignSelf: "stretch",
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  inputTitle: {
    marginBottom: 5,
  },
  input: {
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
  errorBox: {
    backgroundColor: colors.Error,
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
    marginTop: 10,
  },
});

const mapStateToProps = state => ({
  customize: state.customize,
  appData: state.userData,
});

const mapDispatchToProps = dispatch => ({
  logIn: (username, password) => dispatch(logIn(username, password)),
  getData: bindActionCreators(getData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
