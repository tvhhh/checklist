import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import styles from './styles';

export default class ConfirmationBox extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, }}>
        <View style={styles.confirmBoxContent}>
          <Text style={{ fontSize: 20, marginBottom: 5, }}>Delete this task?</Text>
          <Text style={{ fontSize: 14, color: "dimgrey" }}>You cannot undo this action</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={this.props.onCancel}>
            <Text style={{ color: "dodgerblue", fontSize: 20 }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={this.props.onConfirm}>
            <Text style={{ color: "red", fontSize: 20 }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}; 
