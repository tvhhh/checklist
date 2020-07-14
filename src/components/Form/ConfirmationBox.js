import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { connect } from 'react-redux';
import colors from '../../styles/colors';


class ConfirmationBox extends React.Component {
  render() {
    const fontSize = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={[styles.largeText, {fontFamily: font, fontSize: fontSize}]}>Delete this task?</Text>
          <Text style={[styles.smallText, {fontFamily: font, fontSize: fontSize - 5}]}>You cannot undo this action</Text>
        </View>
        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.button} onPress={this.props.onCancel}>
            <Text style={[styles.cancelText, {fontFamily: font, fontSize: fontSize}]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.props.onConfirm}>
            <Text style={[styles.confirmText, {fontFamily: font, fontSize: fontSize}]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  largeText: {
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
  },
  cancelText: {
    color: "dodgerblue",
  },
});

const mapStateToProps = state => ({
  customize: state.customize.customize,
});

export default connect(mapStateToProps)(ConfirmationBox);
