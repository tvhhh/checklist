import React from 'react';
import { StyleSheet, View, } from 'react-native';

import { Menu } from '../components/Button';

import colors from '../styles/colors';


export default class Profile extends React.Component {
  constructor (props) {
    super(props);
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <Menu onPress={this.toggleDrawer} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.Background,
  },
});
