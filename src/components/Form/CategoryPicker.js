import React from 'react';
import { FlatList, StyleSheet, Text, View, } from 'react-native';

import Category from '../Category';

import colors from '../../styles/colors';


export default class CategoryPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ["health", "workout", "work", "study", "payment", "entertainment"],
    };
  }

  handleSubmit = picked => {
    this.props.onSubmit(picked);
    this.props.onBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.categories}
          keyExtractor={(item, index) => item + index}
          renderItem={obj => (
            <View style={styles.categoryContainer}>
              <Category 
                name={obj.item}
                size={80} 
                onPress={() => this.handleSubmit(obj.item)} 
              />
              <Text style={styles.categoryName} >
                {obj.item.charAt(0).toUpperCase() + obj.item.slice(1)}
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  categoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  categoryName: {
    color: colors.PrimaryText,
    fontSize: 12,
  },
});
