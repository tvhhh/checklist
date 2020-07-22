import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { connect } from 'react-redux';

import { Menu, Search, Notice } from './Button';
import Notification from './Notification';

import { extractDateTime } from '../utils/DateTime';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: extractDateTime(new Date()).date,
      isNotificationVisible: false,
    }
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  toggleNotice = () => {
    this.setState({ isNotificationVisible: !this.state.isNotificationVisible });
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
            <Text style={{fontFamily: font, color: theme.SecondaryText, fontSize: fonts.SecondaryText}}>{this.state.today}</Text>
          </View> : null
        }
        {(this.props.search) ?
          <Search style={styles.searchButton} onPress={() => this.props.navigation.navigate("Search")}/> : null
        }
        {(this.props.notice) ?
          <Notice style={styles.noticeButton} onPress={this.toggleNotice} /> : null
        }
        <Overlay
          isVisible={this.state.isNotificationVisible}
          onBackdropPress={this.toggleNotice}
          overlayBackgroundColor={theme.Overlay}
          overlayStyle={styles.noticeContainer}
          children={<Notification customize={this.props.customize} />}
          animationType="fade"
        />
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
  noticeContainer: {
    position: "absolute",
    right: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width * 0.75,
    padding: 0,
  },
});

const mapStateToProps = state => ({
  customize: state.customize,
});

export default connect(mapStateToProps)(Header);
