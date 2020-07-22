import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import CheckButton from './CheckBox';
import Category from './Category';
import { extractDateTime } from '../utils/DateTime';


export default class Task extends React.Component {
  render() {
    const extractedTime = extractDateTime(this.props.dueTime);
    const theme = this.props.customize.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <TouchableOpacity onPress={this.props.onSelect}>
        <View style={[styles.taskContainer, { opacity: (this.props.done) ? 0.5 : 1, backgroundColor: theme.Overlay}]}>
          <CheckButton name="done" checked={this.props.done} onPress={this.props.toggleDone} />
          <View style={styles.textContainer}>
            <Text 
              style={{color: theme.PrimaryText, fontFamily: font, fontSize: fonts.PrimaryText}}
              numberOfLines={1}
              ellipsizeMode="tail"
            >{this.props.title}</Text>
            <Text style={{color: theme.SecondaryText, fontFamily: font, fontSize: fonts.SecondaryText}}>{`${extractedTime.date}  ${extractedTime.time}`}</Text>
          </View>
          <Category name={this.props.category} size={40} />
          <CheckButton name="pinned" checked={this.props.pinned} onPress={this.props.togglePinned} />
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    marginBottom: 5,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  textContainer: {
    flex: 1,
  },
});
