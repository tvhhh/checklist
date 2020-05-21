import React from 'react';
import { TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import colors from '../../styles/colors';

const categoryBackgroundColors = {
  "health": "rgba(255, 0, 0, 0.1)",
  "workout": "rgba(30, 144, 255, 0.1)",
  "work": "rgba(139, 69, 19, 0.1)",
  "study": "rgba(128, 0, 128, 0.1)",
  "payment": "rgba(0, 100, 0, 0.1)",
  "entertainment": "rgba(47, 79, 79, 0.1)",
}

export default class Category extends React.Component {
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

    return (
      <TouchableOpacity 
        style={[
          styles.categoryIcon,
          {
            backgroundColor: categoryBackgroundColors[name],
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
