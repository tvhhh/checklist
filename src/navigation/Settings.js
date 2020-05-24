import React from 'react';
import { View, } from 'react-native';
import Button from '../components/Button/index';
import colors from '../styles/colors';

export default class Settings extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Button.Menu onPress={() => this.props.navigation.toggleDrawer()} />
      </View>
    );
  }
};
