import React from 'react';
import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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

export class NameBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  onChangeName = text => {
    this.setState({ name: text });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.name);
  }

  render() {
    const theme = this.props.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;

    const isSaveButtonDisabled = this.state.name.trim() === "";
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.informationField}>
            <Text style={[styles.infoTitleText, {color: theme.TitleText, fontSize: fonts.PrimaryText, fontFamily: font}]}>Your name is</Text>
            <Text style={{ color: theme.PrimaryText, fontSize: fonts.PrimaryText, fontFamily: font }}>{this.props.name || "You haven't defined your name yet."}</Text>
          </View>
          <View style={styles.inputField}>
            <Text style={[styles.inputTitle, {color: theme.TitleText, fontSize: fonts.PrimaryText, fontFamily: font}]}>Edit your name</Text>
            <TextInput style={[styles.input, {color: theme.PrimaryText, fontSize: fonts.PrimaryText, fontFamily: font}]}
              placeholder="Enter your name here"
              placeholderTextColor={theme.SecondaryText}
              onChangeText={this.onChangeName}
              defaultValue={this.state.name}
              autoCapitalize="words"
            />
          </View>
          <TouchableOpacity 
            style={styles.saveButton} 
            disabled={isSaveButtonDisabled}
            onPress={this.handleSubmit}
          >
            <Text style={[styles.saveText, {fontSize: fonts.ButtonText, fontFamily: font}]}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

export class PhoneBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
    };
  }

  onChangePhone = phone => {
    this.setState({ phone: phone });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.phone);
  }

  render() {
    const theme = this.props.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;
    const isSaveButtonDisabled = this.state.phone.trim() === "";

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.informationField}>
            <Text style={[styles.infoTitleText, {color: theme.TitleText, fontSize: fonts.PrimaryText, fontFamily: font}]}>Your phone number is</Text>
            <Text style={{ color: theme.PrimaryText, fontSize: fonts.PrimaryText, fontFamily: font }}>{this.props.phone || "Add your phone number."}</Text>
          </View>
          <View style={styles.inputField}>
            <Text style={[styles.inputTitle, {color: theme.TitleText, fontSize: fonts.PrimaryText, fontFamily: font}]}>Edit your phone number</Text>
            <TextInput style={[styles.input, {color: theme.PrimaryText, fontSize: fonts.PrimaryText, fontFamily: font}]}
              placeholder="Enter your phone number here"
              placeholderTextColor={theme.SecondaryText}
              keyboardType="phone-pad"
              onChangeText={this.onChangePhone}
              defaultValue={this.state.phone}
            />
          </View>
          <TouchableOpacity 
            style={styles.saveButton} 
            disabled={isSaveButtonDisabled}
            onPress={this.handleSubmit}
          >
            <Text style={[styles.saveText, {fontSize: fonts.ButtonText, fontFamily: font}]}>SAVE</Text>
          </TouchableOpacity>
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
    const theme = this.props.theme;
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
          <TouchableOpacity 
            style={styles.saveButton} 
            disabled={isSaveButtonDisabled}
            onPress={this.handleSubmit}
          >
            <Text style={[styles.saveText, {fontSize: fonts.ButtonText, fontFamily: font}]}>SAVE</Text>
          </TouchableOpacity>
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
    const theme = this.props.theme;
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
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={this.handleSubmit}
          >
            <Text style={[styles.saveText, {fontSize: fonts.ButtonText, fontFamily: font}]}>OK</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconField: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  informationField: {
    flex: 1,
    justifyContent: "center",
  },
  infoTitleText: {
    fontWeight: "bold",
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
  saveButton: {
    backgroundColor: colors.PrimaryColor,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    borderRadius: 5,
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: colors.Error,
  },
});
