import React from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import colors from '../../styles/colors';

export class Plus extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.plusButton} onPress={() => this.props.navigation.navigate(this.props.navigateTo)}>
        <AntDesign 
          name="pluscircle"
          color={colors.PlusButton}
          size={60}
        />
      </TouchableOpacity>
    );
  }
};
