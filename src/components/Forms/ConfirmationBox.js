import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import colors from '../../styles/colors';

export default class ConfirmationBox extends React.Component {
  render() {
    const theme = this.props.customize.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <View style={{ flex: 1, backgroundColor: theme.Overlay }}>
        <View style={styles.content}>
          <Text style={[styles.largeText, {fontFamily: font, fontSize: fonts.TitleText}]}>{this.props.title}</Text>
          <Text style={[styles.smallText, {fontFamily: font, fontSize: fonts.CaptionText}]}>You cannot undo this action</Text>
        </View>
        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.button} onPress={this.props.onCancel}>
            <Text style={[styles.cancelText, {fontFamily: font, fontSize: fonts.ButtonText}]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.props.onConfirm}>
            <Text style={[styles.confirmText, {fontFamily: font, fontSize: fonts.ButtonText}]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  largeText: {
    color: colors.PrimaryText,
    fontWeight: "bold",
    marginBottom: 5,
  },
  smallText: {
    color: colors.PrimaryText,
  },
  optionContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  confirmText: {
    color: "red",
    fontWeight: "bold",
  },
  cancelText: {
    color: "dodgerblue",
    fontWeight: "bold",
  },
});
