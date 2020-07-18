import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Menu, Search, Notice } from './Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { extractDateTime } from '../utils/DateTime';


export default class Header extends React.Component {
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
    return (
      <View style={styles.container}>
        <Menu style={styles.menuButton} onPress={this.toggleDrawer} />
        {(this.props.title) ?
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.time}>{extractDateTime(this.state.today).date}</Text>
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
    fontSize: fonts.HeaderText,
    textAlign: "center",
  },
  time: {
    color: colors.SecondaryText,
    fontSize: fonts.SecondaryText,
    textAlign: "center",
  },
});
