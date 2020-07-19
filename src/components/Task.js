import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { connect } from 'react-redux';

import CheckButton from './CheckBox';
import Category from './Category';

import colors, { lightTheme, darkTheme } from '../styles/colors';

import { smallFonts, mediumFonts, largeFonts } from '../styles/fonts';

import { extractDateTime } from '../utils/DateTime';


export default class Task extends React.Component {
  render() {
    const extractedTime = extractDateTime(this.props.dueTime);
    const theme = this.props.customize.darkTheme ? darkTheme : lightTheme;
    const fonts = mediumFonts;
    const font = this.props.customize.font;
    return (
      <TouchableOpacity onPress={this.props.onSelect}>
        <View style={[styles.taskContainer, { opacity: (this.props.done) ? 0.5 : 1, backgroundColor: theme.Overlay}]}>
          <CheckButton name="done" checked={this.props.done} onPress={this.props.toggleDone} />
          <View style={styles.textContainer}>
            <Text style={{color: theme.PrimaryText, fontFamily: font, fontSize: fonts.PrimaryText}}>{this.props.title}</Text>
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
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
  },
});
