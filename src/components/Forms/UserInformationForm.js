import React from 'react';
import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';


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
    return (
      <View style={styles.colorPickercontainer}>
        <FlatList 
          data={this.state.colors}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.props.setAvatar(item)}>
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
    this.props.setName(this.state.name);
  }

  render() {
    const isSaveButtonDisabled = this.state.name.trim() === "";
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.informationField}>
            <Text style={styles.infoTitleText}>Your name is</Text>
            <Text style={styles.informationText}>{this.props.name || "You haven't defined your name yet."}</Text>
          </View>
          <View style={styles.inputField}>
            <Text style={styles.inputTitle}>Your new name is</Text>
            <TextInput style={styles.input}
              placeholder="Enter your name here"
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
            <Text style={styles.saveText}>SAVE</Text>
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
    this.props.setPhone(this.state.phone);
  }

  render() {
    const isSaveButtonDisabled = this.state.phone.trim() === "";
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.informationField}>
            <Text style={styles.infoTitleText}>Your phone number is</Text>
            <Text style={styles.informationText}>{this.props.phone || "Add your phone number."}</Text>
          </View>
          <View style={styles.inputField}>
            <Text style={styles.inputTitle}>Your new phone number is</Text>
            <TextInput style={styles.input}
              placeholder="Enter your phone number here"
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
            <Text style={styles.saveText}>SAVE</Text>
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
    };
  }

  onConfirmCurrentPassword = password => {
    this.setState({ currentPassword: password, errorCurrentPassword: false });
  }

  onChangePassword = password => {
    this.setState({ password: password });
  }

  onConfirmPassword = password => {
    this.setState({ confirmedPassword: password, errorConfirmPassword: false });
  }

  handleSubmit = () => {
    if (this.state.currentPassword !== this.props.currentPassword) {
      this.setState({ errorCurrentPassword: true });
    } else if (this.state.confirmedPassword !== this.state.password) {
      this.setState({ errorConfirmPassword: true });
    } else {
      this.props.setPassword(this.state.password);
    }
  }

  render() {
    const isSaveButtonDisabled = this.state.password.trim() === "";
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.inputField}>
            <Text style={styles.inputTitle}>Your current password</Text>
            <TextInput style={styles.passwordInput}
              placeholder="Enter your current password"
              onChangeText={this.onConfirmCurrentPassword}
              defaultValue={this.state.currentPassword}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            {this.state.errorCurrentPassword ?
              <Text style={styles.errorText}>
                Incorrect password.
              </Text> : null
            }
          </View>
          <View style={styles.inputField}>
            <Text style={styles.inputTitle}>Your new password</Text>
            <TextInput style={styles.passwordInput}
              placeholder="Enter your new password"
              onChangeText={this.onChangePassword}
              defaultValue={this.state.password}
              secureTextEntry={true}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.inputTitle}>Confirm your new password</Text>
            <TextInput style={styles.passwordInput}
              placeholder="Re-enter your new password"
              onChangeText={this.onConfirmPassword}
              defaultValue={this.state.confirmedPassword}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            {this.state.errorConfirmPassword ?
              <Text style={styles.errorText}>
                Unmatched password.
              </Text> : null
            }
          </View>
          <TouchableOpacity 
            style={styles.saveButton} 
            disabled={isSaveButtonDisabled}
            onPress={this.handleSubmit}
          >
            <Text style={styles.saveText}>SAVE</Text>
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

  handleSubmit = () => {
    if (this.state.password !== this.props.currentPassword) {
      this.setState({ error: true });
    } else {
      this.props.onConfirmSuccess();
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.iconField}>
            <FontAwesome5 name="user-times" size={60} />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.inputTitle}>Your current password</Text>
            <TextInput style={styles.passwordInput}
              placeholder="Confirm your password"
              onChangeText={this.onConfirmPassword}
              defaultValue={this.state.password}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            {this.state.error ?
              <Text style={styles.errorText}>
                Incorrect password.
              </Text> : null
            }
          </View>
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={this.handleSubmit}
          >
            <Text style={styles.saveText}>OK</Text>
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
    color: colors.TitleText,
    fontSize: fonts.PrimaryText,
    fontWeight: "bold",
  },
  informationText: {
    color: colors.PrimaryText,
    fontSize: fonts.PrimaryText,
  },
  inputField: {
    flex: 1,
    justifyContent: "center",
  },
  inputTitle: {
    color: colors.TitleText,
    fontSize: fonts.PrimaryText,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    fontSize: fonts.PrimaryText,
    borderColor: colors.Border,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  passwordInput: {
    fontSize: fonts.PrimaryText,
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
    marginTop: 20,
    borderRadius: 5,
  },
  saveText: {
    color: "white",
    fontSize: fonts.ButtonText,
  },
  errorText: {
    color: colors.ErrorText,
    fontSize: fonts.ErrorText,
  },
});
