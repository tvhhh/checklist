import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import colors from '../styles/colors';
import Task from './Task';


class Category extends React.Component {
  render() {
    let name = this.props.name;
    let size = this.props.size || 60;
    let icon;
    switch (name) {
      case "health":
        icon = <FontAwesome name="heartbeat" color={colors.Health} size={0.625 * size} />;
        break;
      case "workout":
        icon = <MaterialCommunityIcons name="run-fast" color={colors.Workout} size={0.625 * size} />;
        break;
      case "work":
        icon = <Entypo name="briefcase" color={colors.Work} size={0.625 * size} />;
        break;
      case "study":
        icon = <Ionicons name="md-school" color={colors.Study} size={0.625 * size} />;
        break;
      case "payment":
        icon = <FontAwesome5 name="money-bill-wave" color={colors.Payment} size={0.625 * size} />;
        break;
      case "entertainment":
        icon = <MaterialCommunityIcons name="theater" color={colors.Entertainment} size={0.625 * size} />;
        break;
    }
    if (name == "uncategorized" && this.props.customize.darkTheme) name = "uncategorizedd";
    return (
      <TouchableOpacity 
        style={[
          styles.categoryIcon,
          {
            backgroundColor: colors[name.charAt(0).toUpperCase() + name.slice(1)].replace('1.0', '0.1'),
            height: size,
            width: size,
            borderRadius: size / 2,
          }
        ]} 
        onPress={this.props.onPress} 
      >
        {icon}
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  categoryIcon: {
    alignItems: "center",
    justifyContent: "center", 
  },
});

const mapStateToProps = state => ({
  customize: state.customize,
});

export default connect(mapStateToProps)(Category);