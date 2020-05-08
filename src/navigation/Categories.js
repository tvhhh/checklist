import React from 'react';
import { Text, View, } from 'react-native';
import Header from '../components/Header/index';
import colors from '../styles/colors';

const Categories = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.GhostWhite }}>
      <Header title="CATEGORIES" />
      <Text>Categories here</Text>
    </View>
  );
};

export default Categories;
