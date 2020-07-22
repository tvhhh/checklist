import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { connect } from 'react-redux';

import { ErrorBox, NoInternetAlert } from './LogIn';

import colors from '../../styles/colors';

import { registerUser } from '../../redux/actions/UserDataActions';


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
      errorMessage: "",
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
    } else if (this.checkUnmatchedPassword(this.state.user.password, this.state.user.confirmedPassword)) {
      this.setState({ error: true, errorMessage: "Unmatched password." });
    } else {
      const res = await registerUser(this.state.user);
      if (res === "done") {
        this.clearAllInput();
        this.props.navigation.goBack();
      } else {
        this.setState({ error: true, errorMessage: res });
      }
    }
  }
  
  render() {
    const theme = this.props.customize.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, { flex: 1, backgroundColor: theme.Background }]}>
          <Text style={[styles.title, {fontFamily: font, fontSize: fonts.HeavyText}]}>SIGN UP</Text>
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
            <Text style={[styles.inputTitle, {color: theme.TitleText, fontFamily: font, fontSize: fonts.TitleText}]}>Email</Text>
            <TextInput style={[styles.input, {color: theme.PrimaryText, fontFamily: font, fontSize: fonts.PrimaryText}]}
              placeholder="Enter email"
              placeholderTextColor={theme.SecondaryText}
              onChangeText={this.onChangeEmail}
              defaultValue={this.state.email}
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
          <View style={styles.inputField}>
            <Text style={[styles.inputTitle, {color: theme.TitleText, fontFamily: font, fontSize: fonts.TitleText}]}>Confirm password</Text>
            <TextInput style={[styles.input, {color: theme.PrimaryText, fontFamily: font, fontSize: fonts.PrimaryText}]}
              placeholder="Re-enter password"
              placeholderTextColor={theme.SecondaryText}
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
            <Text style={[styles.submitText, {fontFamily: font, fontSize: fonts.ButtonText}]}>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.otherOptionsButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={[styles.otherOptionsText, {fontFamily: font, fontSize: fonts.SecondaryText}]}>Back to Login</Text>
          </TouchableOpacity>
          {this.state.error ? 
            <ErrorBox 
              error={this.state.errorMessage}
              customize={this.props.customize}
            /> : null
          }
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
    paddingVertical: 5,
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
  otherOptionsButton: {
    paddingHorizontal: 5,
  },
  otherOptionsText: {
    color: colors.PrimaryColor,
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
