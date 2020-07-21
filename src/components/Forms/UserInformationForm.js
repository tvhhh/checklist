import React from 'react';
import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from '../../styles/colors';

import { reauthenticateUser, setPassword } from '../../redux/actions/UserDataActions';


export class AvatarPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [
        "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3",
        "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39",
        "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b",
      ],
    };
  }

  render() {
    const theme = this.props.customize.theme;
    return (
      <View style={[styles.colorPickercontainer, { backgroundColor: theme.Overlay }]}>
        <FlatList 
          data={this.state.colors}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.props.onSubmit(item)}>
              <View style={[styles.colorPicker, {backgroundColor: item}]}></View>
            </TouchableOpacity>
          )}
          numColumns={6}
        />
      </View>
    );
  }
}

export class InformationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: this.props.info || "",
    };
  }

  onChangeInfo = text => {
    this.setState({ info: text });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.info, this.props.type);
  }

  render() {
    const theme = this.props.customize.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;

    const isSaveButtonDisabled = this.state.info.trim() === "";

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.inputField}>
            <Text style={[styles.inputTitle, {color: theme.TitleText, fontSize: fonts.PrimaryText, fontFamily: font}]}>{this.props.inputTitle}</Text>
            <TextInput style={[styles.input, {color: theme.PrimaryText, fontSize: fonts.PrimaryText, fontFamily: font}]}
              placeholder={this.props.placeholder}
              placeholderTextColor={theme.SecondaryText}
              onChangeText={this.onChangeInfo}
              defaultValue={this.state.info}
              keyboardType={this.props.type === "phone" ? "phone-pad" : "default"}
              autoCapitalize={this.props.type === "name" ? "words" : "none"}
            />
          </View>
          <View style={styles.saveButtonContainer}>
            <TouchableOpacity disabled={isSaveButtonDisabled} onPress={this.handleSubmit}>
              <MaterialIcons 
                name="done"
                size={40}
                color={isSaveButtonDisabled ? colors.DisabledColor : colors.PrimaryColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

export class PasswordBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      password: "",
      confirmedPassword: "",
      errorCurrentPassword: false,
      errorConfirmPassword: false,
      errorNewPassword: false,
      errorNewPasswordMessage: "",
    };
  }

  onConfirmCurrentPassword = password => {
    this.setState({ currentPassword: password, errorCurrentPassword: false });
  }

  onChangePassword = password => {
    this.setState({ password: password, errorNewPassword: false });
  }

  onConfirmPassword = password => {
    this.setState({ confirmedPassword: password, errorConfirmPassword: false });
  }

  handleSubmit = async () => {
    if (await reauthenticateUser(this.state.currentPassword) !== "done") {
      this.setState({ errorCurrentPassword: true });
    } else if (this.state.confirmedPassword !== this.state.password) {
      this.setState({ errorConfirmPassword: true });
    } else {
      const res = await setPassword(this.state.password);
      if (res !== "done") {
        this.setState({ errorNewPassword: true, errorNewPasswordMessage: res });
      } else {
        this.props.onSubmit();
      }
    }
  }

  render() {
    const theme = this.props.customize.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;
    const isSaveButtonDisabled = this.state.password.trim() === "";

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.inputField}>
            <Text style={[styles.inputTitle, {color: theme.TitleText, fontSize: fonts.PrimaryText, fontFamily: font}]}>Your current password</Text>
            <TextInput style={[styles.passwordInput, {color: theme.PrimaryText, fontSize: fonts.PrimaryText, fontFamily: font}]}
              placeholder="Enter your current password"
              placeholderTextColor={theme.SecondaryText}
              onChangeText={this.onConfirmCurrentPassword}
              defaultValue={this.state.currentPassword}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            {this.state.errorCurrentPassword ?
              <Text style={[styles.errorText, {fontSize: fonts.ErrorText, fontFamily: font}]}>
                Incorrect password.
              </Text> : null
            }
          </View>
          <View style={styles.inputField}>
            <Text style={[styles.inputTitle, {color: theme.TitleText, fontSize: fonts.PrimaryText, fontFamily: font}]}>Your new password</Text>
            <TextInput style={[styles.passwordInput, {color: theme.PrimaryText, fontSize: fonts.PrimaryText, fontFamily: font}]}
              placeholder="Enter your new password"
              placeholderTextColor={theme.SecondaryText}
              onChangeText={this.onChangePassword}
              defaultValue={this.state.password}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            {this.state.errorNewPassword ?
              <Text style={[styles.errorText, {fontSize: fonts.ErrorText, fontFamily: font}]}>
                {this.state.errorNewPasswordMessage}
              </Text> : null
            }
          </View>
          <View style={styles.inputField}>
            <Text style={[styles.inputTitle, {color: theme.TitleText, fontSize: fonts.PrimaryText, fontFamily: font}]}>Confirm your new password</Text>
            <TextInput style={[styles.passwordInput, {color: theme.PrimaryText, fontSize: fonts.PrimaryText, fontFamily: font}]}
              placeholder="Re-enter your new password"
              placeholderTextColor={theme.SecondaryText}
              onChangeText={this.onConfirmPassword}
              defaultValue={this.state.confirmedPassword}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            {this.state.errorConfirmPassword ?
              <Text style={[styles.errorText, {fontSize: fonts.ErrorText, fontFamily: font}]}>
                Unmatched password.
              </Text> : null
            }
          </View>
          <View style={styles.saveButtonContainer}>
            <MaterialIcons 
              name="done"
              size={40}
              color={isSaveButtonDisabled ? colors.DisabledColor : colors.PrimaryColor}
              disabled={isSaveButtonDisabled}
              onPress={this.handleSubmit}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

export class ConfirmPasswordBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      error: false,
    };
  }

  onConfirmPassword = password => {
    this.setState({ password: password, error: false });
  }

  handleSubmit = async () => {
    if (await reauthenticateUser(this.state.password) !== "done") {
      this.setState({ error: true });
    } else {
      this.props.onSubmit();
    }
  }

  render() {
    const theme = this.props.customize.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.iconField}>
            <FontAwesome5 name="user-times" size={60} color={colors.DisabledColor} />
          </View>
          <View style={styles.inputField}>
            <Text style={[styles.inputTitle, {color: theme.TitleText, fontSize: fonts.PrimaryText, fontFamily: font}]}>Your current password</Text>
            <TextInput style={[styles.passwordInput, {color: theme.PrimaryText, fontSize: fonts.PrimaryText, fontFamily: font}]}
              placeholder="Confirm your password"
              placeholderTextColor={theme.SecondaryText}
              onChangeText={this.onConfirmPassword}
              defaultValue={this.state.password}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            {this.state.error ?
              <Text style={[styles.errorText, {fontSize: fonts.ErrorText, fontFamily: font}]}>
                Incorrect password.
              </Text> : null
            }
          </View>
          <View style={styles.saveButtonContainer}>
            <MaterialIcons 
              name="done"
              size={40}
              color={colors.PrimaryColor}
              onPress={this.handleSubmit}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  iconField: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputField: {
    flex: 1,
    justifyContent: "center",
  },
  inputTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderColor: colors.Border,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  passwordInput: {
    borderColor: colors.Border,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  colorPickercontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  colorPicker: {
    height: 40,
    width: 40,
    margin: 3,
    borderRadius: 20,
  },
  saveButtonContainer: {
    alignItems: "flex-end",
    marginTop: 15,
    borderRadius: 5,
  },
  errorText: {
    color: colors.Error,
  },
});
