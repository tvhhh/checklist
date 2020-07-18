import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export class FontSizeForm extends React.Component {

  constructor (props) {
    super(props);
  }
 
  render() {
    return(
      <TouchableWithoutFeedback>
      <View style={{ flex: 1, backgroundColor: this.props.theme }}>
        <TouchableOpacity style={styles.container} onPress={() => this.props.onPress("small")}>
          <Text style={[styles.options, {color: this.props.textColor, fontSize: 20}]}>Small</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} onPress={() => this.props.onPress("medium")}>
          <Text style={[styles.options, {color: this.props.textColor, fontSize: 25}]}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} onPress={() => this.props.onPress("large")}>
          <Text style={[styles.options, {color: this.props.textColor, fontSize: 30}]}>Large</Text>
        </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

export class FontForm extends React.Component {

  constructor (props) {
    super(props);
    this.state={
    }
  }

  render() {
    return(
      <View style={{ flex: 1, backgroundColor: this.props.theme }}>
        <TouchableOpacity style={styles.container} onPress={() => this.props.onPress("sans-serif")}>
          <Text style={[styles.options, {color: this.props.textColor, fontFamily: "sans-serif"}]}>Sans Serif</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}  onPress={() => this.props.onPress("monospace")}>
          <Text style={[styles.options, {color: this.props.textColor, fontFamily: "monospace"}]}>Monospace</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}  onPress={() => this.props.onPress("sans-serif-light")}>
          <Text style={[styles.options, {color: this.props.textColor, fontFamily: "sans-serif-light"}]}>Sans Serif Light</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 2,
    marginTop:10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomColor: "grey",
  },
  options: {
    marginLeft: 30, 
    fontSize: 25,
  },
});