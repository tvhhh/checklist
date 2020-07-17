import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

import colors from '../../styles/colors';


export default class ConfirmationBox extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.largeText}>{this.props.title}</Text>
          <Text style={styles.smallText}>You cannot undo this action</Text>
        </View>
        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.button} onPress={this.props.onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.props.onConfirm}>
            <Text style={styles.confirmText}>Delete</Text>
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
    color: colors.PrimaryText,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  smallText: {
    color: colors.PrimaryText,
    fontSize: 14,
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
    fontSize: 20,
    fontWeight: "bold",
  },
  cancelText: {
    color: "dodgerblue",
    fontSize: 20,
    fontWeight: "bold",
  },
});
