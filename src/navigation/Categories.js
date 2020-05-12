import React from 'react';
import { View, } from 'react-native';
import Header from '../components/Header/index';
import Category from '../components/Category/index';
import colors from '../styles/colors';

export default class Categories extends React.Component {
  render() {
    const categories = ["health", "workout", "work", "study", "payment", "entertainment"];

    return (
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Header title="CATEGORIES" />
        <View style={{ flexDirection: "row", alignSelf: "stretch", justifyContent: "center", marginTop: 5, }}>
          {categories.map((category, index) => (<Category name={category} key={index} />))}
        </View>
      </View>
    );
  }
};
