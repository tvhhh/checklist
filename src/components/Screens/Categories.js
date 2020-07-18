import React from 'react';
import { FlatList, StyleSheet, Text, View, } from 'react-native';

import Header from '../Header';
import Category from '../Category';

import screenStyles from './ScreenStyles';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';


export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        "health", "workout", "ideas",
        "work", "payment", "liveliness",
        "meeting", "study", "event",
      ],
    };
  }

  render() {
    return (
      <View style={[screenStyles.screenContainer, styles.container]}>
        <Header
          navigation={this.props.navigation} 
          title={this.props.title}
          search={true}
          notice={true}
        />
        <FlatList 
          data={this.state.categories}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.categoryContainer}>
              <Category name={item} size={100} />
              <Text style={[
                styles.categoryName,
                { color: colors[item.charAt(0).toUpperCase() + item.slice(1)] }
              ]}>
                {item.toUpperCase()}
              </Text>
            </View>
          )}
          numColumns={3}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: { 
    justifyContent: "center", 
    alignItems: "center",
  },
  categoryContainer: {
    alignItems: "center", 
    justifyContent: "center", 
    padding: 10,
  },
  categoryName: {
    fontSize: fonts.CaptionText,
  },
});
