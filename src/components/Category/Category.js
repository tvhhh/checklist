import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';

export default class Category extends React.Component {
  render() {
    let name = this.props.name;
    let size = this.props.size || 55;
    let icon;
    if (name === "health") {
      icon = <FontAwesome name="heartbeat" color={colors.Health} size={size} />
    } else if (name === "workout") {
      icon = <MaterialCommunityIcons name="run-fast" color={colors.Workout} size={size} />
    } else if (name === "work") {
      icon = <Entypo name="briefcase" color={colors.Work} size={size} />
    } else if (name === "study") {
      icon = <Ionicons name="md-school" color={colors.Study} size={size} />
    } else if (name === "payment") {
      icon = <FontAwesome5 name="money-bill-wave" color={colors.Payment} size={size} />
    } else if (name === "entertainment") {
      icon = <MaterialCommunityIcons name="theater" color={colors.Entertainment} size={size} />
    }

    return (
      <TouchableOpacity style={{ alignItems: "center", marginLeft: 8, marginRight: 8, }}>
        {icon}
        <Text style={{ color: "dimgrey" }}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  }
}
