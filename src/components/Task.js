import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

import CheckButton from './CheckBox';
import Category from './Category';

import colors from '../styles/colors';
import { connect } from 'react-redux';
import { extractDateTime } from '../utils/DateTime';


class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      description: this.props.description,
      dueTime: this.props.dueTime,
      category: this.props.category,
      pinned: false,
      done: false,
    };
  }

  UNSAFE_componentWillReceiveProps = newProps => {
    this.setState({ ...newProps });
  }

  render() {
    const extractedTime = extractDateTime(this.state.dueTime);
    const overlayTheme = this.props.darkTheme ? colors.DarkOverlay : colors.LightOverlay;
    const titleTextColor = this.props.darkTheme ? colors.DarkPrimaryText : colors.LightPrimaryText;
    const timeTextColor = this.props.darkTheme ? colors.DarkSecondaryText : colors.LightSecondaryText;
    return (
      <TouchableOpacity onPress={this.props.onSelect}>
        <View style={[styles.taskContainer, { opacity: (this.state.done) ? 0.5 : 1, backgroundColor: overlayTheme}]}>
          <CheckButton name="done" checked={this.state.done} onPress={this.props.toggleDone} />
          <View style={styles.textContainer}>
            <Text style={[styles.taskTitle, {color: titleTextColor}]}>{this.state.title}</Text>
            <Text style={[styles.taskTime, {color: timeTextColor}]}>{`${extractedTime.date}  ${extractedTime.time}`}</Text>
          </View>
          <Category name={this.state.category} size={40} />
          <CheckButton name="pinned" checked={this.state.pinned} onPress={this.props.togglePinned} />
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
  darkTheme: state.customize.darkTheme,
});

export default connect(mapStateToProps)(Task);
