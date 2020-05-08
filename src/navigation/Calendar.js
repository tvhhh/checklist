import React from 'react';
import { Text, View, } from 'react-native';
import Header from '../components/Header/index';
import colors from '../styles/colors';

const Calendar = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.GhostWhite }}>
      <Header title="CALENDAR" />
      <Text>Calendar here</Text>
    </View>
  );
};

export default Calendar;
