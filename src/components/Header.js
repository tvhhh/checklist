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
    const titleColor = this.props.customize.darkTheme ? colors.DarkPrimaryText : colors.LightPrimaryText ;
    const timeColor = this.props.customize.darkTheme ? colors.DarkSecondaryText: colors.LightSecondaryText;
    const fontSize = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <View style={styles.container}>
        <Text style={{
          color: titleColor, 
          fontSize: fontSize, 
          textAlign: "center",
          fontFamily: font,
          }}>{this.props.title}</Text>
        <Text style={{
          color: timeColor,
          fontSize: fontSize - 7,
          textAlign: "center",
          fontFamily: font
          }}>{extractDateTime(this.state.today).date}</Text>
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
  customize: state.customize,
});

export default connect(mapStateToProps)(Header);