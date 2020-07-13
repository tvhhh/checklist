import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../styles/colors';

import { extractDateTime } from '../utils/DateTime';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
    }
  }

  render() {
    const titleColor = this.props.darkTheme ? colors.DarkPrimaryText : colors.LightPrimaryText ;
    const timeColor = this.props.darkTheme ? colors.DarkSecondaryText: colors.LightSecondaryText;
    return (
      <View style={styles.container}>
        <Text style={{color: titleColor, fontSize: 24, textAlign: "center"}}>{this.props.title}</Text>
        <Text style={{color: timeColor, fontSize: 14, textAlign: "center"}}>{extractDateTime(this.state.today).date}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginBottom: 10,
  },
});

const mapStateToProps = state => ({
  darkTheme: state.customize.darkTheme,
});

export default connect(mapStateToProps)(Header);