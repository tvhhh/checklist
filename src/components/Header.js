import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { Menu, Search, Notice } from './Button';

import { extractDateTime } from '../utils/DateTime';

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
    const theme = this.props.customize.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <View style={styles.container}>
        <Menu style={styles.menuButton} onPress={this.toggleDrawer} />
        {(this.props.title) ?
          <View style={styles.titleContainer}>
            <Text style={{fontFamily: font, color: theme.TitleText, fontSize: fonts.HeaderText}}>{this.props.title}</Text>
            <Text style={{fontFamily: font, color: theme.SecondaryText, fontSize: fonts.SecondaryText}}>{extractDateTime(this.state.today).date}</Text>
          </View> : null
        }
        {(this.props.search) ?
          <Search style={styles.searchButton} onPress={() => this.props.navigation.navigate("Search")}/> : null
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
});

const mapStateToProps = state => ({
  customize: state.customize,
});

export default connect(mapStateToProps)(Header);
