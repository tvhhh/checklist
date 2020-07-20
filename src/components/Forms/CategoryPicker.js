import React from 'react';
import { FlatList, StyleSheet, Text, View, } from 'react-native';
import { connect } from 'react-redux';
import Category from '../Category';

import colors, { lightTheme, darkTheme } from '../../styles/colors';
import { smallFonts, mediumFonts, largeFonts } from '../../styles/fonts';


export default class CategoryPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        "health", "workout", "ideas",
        "work", "payment", "liveliness",
        "meeting", "study", "event", 
        "uncategorized", "default",
      ],
    };
  }

  handleSubmit = picked => {
    this.props.onSubmit(picked);
  }

  dataPicker = () => {
    if (typeof this.props.hasDefault === "undefined"){
      return this.state.categories.slice(0,this.state.categories.length - 1);
    }
    return this.state.categories;
  }

  render() {
    const theme = this.props.customize.darkTheme ? darkTheme : lightTheme;
    const fonts = mediumFonts;
    const font = this.props.customize.font;
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.dataPicker()}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.categoryContainer}>
              <Category 
                name={item}
                size={80} 
                onPress={() => this.props.onSubmit(item)} 
              />
              <Text style={
                { color: colors[item.charAt(0).toUpperCase() + item.slice(1)] , fontFamily: font, fontSize: fonts.TertiaryText }
              }>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
});
