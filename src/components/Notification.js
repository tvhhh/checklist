import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import TaskList, { FILTER_NOTIFICATION } from './TaskList';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../styles/colors';

import { showNotification } from '../utils/Notification';


export default class Notification extends React.Component {
  render() {
    const theme = this.props.customize.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <View style={styles.container}>
        <TaskList
          filterOption={FILTER_NOTIFICATION}
          listEmptyComponent={
            <View style={styles.emptyComponent}>
              <MaterialCommunityIcons name="playlist-check" color={colors.Button} size={100} />
              <Text style={{ color: theme.PrimaryText, fontSize: fonts.TitleText, fontFamily: font }}>Nothing for today</Text>
              <Text style={{ color: theme.SecondaryText, fontSize: fonts.PrimaryText, fontFamily: font }}>Enjoy your day!</Text>
            </View>
          }
        />
        <TouchableOpacity style={{ position: "absolute", bottom: 5, height: 100, width: 100, backgroundColor: "red" }} onPress={showNotification} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  emptyComponent: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 250,
  },
});
