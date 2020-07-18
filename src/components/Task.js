import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

import CheckButton from './CheckBox';
import Category from './Category';

import colors from '../styles/colors';
import { connect } from 'react-redux';
import { extractDateTime } from '../utils/DateTime';


class Task extends React.Component {
  render() {
    const extractedTime = extractDateTime(this.props.dueTime);
    const overlayTheme = this.props.customize.darkTheme ? colors.DarkOverlay : colors.LightOverlay;
    const titleTextColor = this.props.customize.darkTheme ? colors.DarkPrimaryText : colors.LightPrimaryText;
    const timeTextColor = this.props.customize.darkTheme ? colors.DarkSecondaryText : colors.LightSecondaryText;
    const fontSize = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <TouchableOpacity onPress={this.props.onSelect}>
        <View style={[styles.taskContainer, { opacity: (this.props.done) ? 0.5 : 1, backgroundColor: overlayTheme}]}>
          <CheckButton name="done" checked={this.props.done} onPress={this.props.toggleDone} />
          <View style={styles.textContainer}>
            <Text style={[styles.taskTitle, {color: titleTextColor, fontFamily: font, fontSize: fontSize - 3}]}>{this.props.title}</Text>
            <Text style={[styles.taskTime, {color: timeTextColor, fontFamily: font, fontSize: fontSize - 5}]}>{`${extractedTime.date}  ${extractedTime.time}`}</Text>
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
    backgroundColor: colors.LightOverlay,
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
  taskTitle: {
    fontSize: 14,
    color: colors.PrimaryText,
  },
  taskTime: {
    fontSize: 12,
    color: colors.SecondaryText,
  },
});
const mapStateToProps = state => ({
  customize: state.customize,
});

export default connect(mapStateToProps)(Task);
