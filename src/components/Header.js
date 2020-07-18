import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Menu, Search, Notice } from './Button';

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

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  render() {
    const titleColor = this.props.customize.darkTheme ? colors.DarkPrimaryText : colors.LightPrimaryText ;
    const timeColor = this.props.customize.darkTheme ? colors.DarkSecondaryText: colors.LightSecondaryText;
    const fontSize = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <View style={styles.container}>
        <Menu style={styles.menuButton} onPress={this.toggleDrawer} />
        {(this.props.title) ?
          <View style={styles.titleContainer}>
            <Text style={[styles.title, {fontFamily: font, color: titleColor, fontSize: fontSize}]}>{this.props.title}</Text>
            <Text style={[styles.time, {fontFamily: font, color: timeColor, fontSize: fontSize - 7}]}>{extractDateTime(this.state.today).date}</Text>
          </View> : null
        }
        {(this.props.search) ?
          <Search style={styles.searchButton} /> : null
        }
        {(this.props.notice) ?
          <Notice style={styles.noticeButton} /> : null
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  menuButton: {
    marginLeft: 10,
  },
  searchButton: {
    position: "absolute",
    right: 35,
  },
  noticeButton: {
    position: "absolute",
    right: 10,
  },
  title: {
    color: colors.TitleText,
    fontSize: 24,
    textAlign: "center",
  },
  time: {
    color: colors.SecondaryText,
    fontSize: 14,
    textAlign: "center",
  },
});

const mapStateToProps = state => ({
  customize: state.customize,
});

export default connect(mapStateToProps)(Header);