import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';

import colors from '../../styles/colors';

import { resetPassword } from '../../redux/actions/UserDataActions';


class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      success: false,
      error: false,
      errorMessage: "",
    };
  }

  onChangeEmail = text => {
    this.setState({ email: text, success: false, error: false });
  }

  handleSubmit = async () => {
    const res = await resetPassword(this.state.email);
    if (res === "done") {
      this.setState({ success: true, error: false });
    } else {
      this.setState({ error: true, errorMessage: res, success: false });
    }
  }

  render() {
    const theme = this.props.customize.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: theme.Background }}>
          <View style={styles.inputField}>
            <Text style={[styles.inputTitle, {color: theme.TitleText, fontSize: fonts.TitleText, fontFamily: font}]}>Forgot password?</Text>
            <TextInput style={[styles.input, {color: theme.PrimaryText, fontSize: fonts.PrimaryText, fontFamily: font}]} 
              placeholder="Enter your email address"
              placeholderTextColor={theme.SecondaryText}
              onChangeText={this.onChangeEmail}
              defaultValue={this.state.email}
              autoCapitalize="none"
            />
            {this.state.error ?
              <Text style={[styles.errorText, {fontSize: fonts.ErrorText, fontFamily: font}]}>
                {this.state.errorMessage}
              </Text> : null
            }
          </View>
          <TouchableOpacity
            disabled={this.state.success}
            style={[styles.submitButton, { backgroundColor: this.state.success ? "#d3d3d3" : colors.SecondaryColor }]}
            onPress={this.handleSubmit}
          >
            <Text style={[styles.submitText, {fontSize: fonts.ButtonText, fontFamily: font}]}>
              {this.state.success ? "SENT" : "SEND EMAIL"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  inputField: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  inputTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderColor: colors.Border,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  submitButton: {
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
  errorText: {
    color: colors.Error,
  },
});

const mapStateToProps = state => ({
  customize: state.customize,
});

export default connect(mapStateToProps)(ForgotPassword);
