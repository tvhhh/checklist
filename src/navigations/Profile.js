import React from 'react';
import { StyleSheet, View, } from 'react-native';

import { Menu } from '../components/Button';

import colors from '../styles/colors';
import { connect } from 'react-redux';

class Profile extends React.Component {
  constructor (props) {
    super(props);
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  render() {
    const theme = this.props.customize.darkTheme ? colors.DarkBackground: colors.LightBackground ;
    return (
      <View style={{flex: 1, backgroundColor: theme}}>
        <Menu onPress={this.toggleDrawer} />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  customize: state.customize,
});


export default connect(mapStateToProps)(Profile);