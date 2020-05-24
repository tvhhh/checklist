import React from 'react';
import { TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import colors from '../../styles/colors';

export default class Category extends React.Component {
  render() {
    let name = this.props.name;
    let size = this.props.size || 55;
    let icon;
    switch (name) {
      case "health":
        icon = <FontAwesome name="heartbeat" color={colors.Health} size={size} />;
        break;
      case "workout":
        icon = <MaterialCommunityIcons name="run-fast" color={colors.Workout} size={size} />;
        break;
      case "work":
        icon = <Entypo name="briefcase" color={colors.Work} size={size} />;
        break;
      case "study":
        icon = <Ionicons name="md-school" color={colors.Study} size={size} />;
        break;
      case "payment":
        icon = <FontAwesome5 name="money-bill-wave" color={colors.Payment} size={size} />;
        break;
      case "entertainment":
        icon = <MaterialCommunityIcons name="theater" color={colors.Entertainment} size={size} />;
        break;
    }

    return (
      <TouchableOpacity style={styles.categoryIcon} onPress={this.props.onPress} >
        {icon}
      </TouchableOpacity>
    );
  }
};
