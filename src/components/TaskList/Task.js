import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import CheckButton from '../CheckBox/index';
import Category from '../Category/index';
import styles from './styles';
import { extractDateTime } from '../../utils/DateTime';

export default class Task extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
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

  togglePinned = () => {
    this.setState({ pinned: !this.state.pinned });
  }

  toggleDone = () => {
    this.setState({ done: !this.state.done });
  }

  render() {
    const time = extractDateTime(this.state.dueTime);
    const extractedTime = `${time.date}  ${time.time}`;
    return (
      <TouchableOpacity onPress={this.props.onSelect}>
        <View style={[styles.task, { opacity: (this.state.done) ? 0.5 : 1 }]}>
        {this.props.showStateOption ?
          <CheckButton name="done" checked={this.state.done} onPress={this.toggleDone} /> : null
        }
        <View style={{ flex: 1, }}>
          <Text style={{ fontSize: 14, }}>{this.state.title}</Text>
          <Text style={{ fontSize: 12, color: "grey", }}>{extractedTime}</Text>
        </View>
        <Category name={this.props.category} size={40} />
        {this.props.showStateOption ? 
          <CheckButton name="pinned" checked={this.state.pinned} onPress={this.togglePinned} /> : null
        }
        </View>
      </TouchableOpacity>
    );
  }
};
