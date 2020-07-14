import React from 'react';
import { FlatList, StyleSheet, Text, View, } from 'react-native';

import Header from '../Header';
import Category from '../Category';
import { Menu, Notice, Search } from '../Button';

import screenStyles from './ScreenStyles';
import colors from '../../styles/colors';


export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ["health", "workout", "work", "study", "payment", "entertainment"],
    };
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  render() {
    return (
      <View style={[screenStyles.screenContainer, styles.container]}>
        <Header title={this.props.title} />
        <Menu onPress={this.toggleDrawer} />
        <Search
          position={{ position: "absolute", top: 12, right: 45, }}
          onPress={() => this.props.navigation.navigate("Search",{taskList: this.props.taskList})}
        />
        <Notice onPress={() => this.props.navigation.navigate("Notice")} />
        <FlatList 
          data={this.state.categories}
          keyExtractor={(item, index) => item + index}
          renderItem={obj => (
            <View style={styles.categoryContainer}>
              <Category name={obj.item} size={100} />
              <Text style={styles.categoryName}>
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
    justifyContent: "center", 
    alignItems: "center",
  },
  categoryContainer: {
    alignItems: "center", 
    justifyContent: "center", 
    padding: 10,
  },
  categoryName: {
    color: colors.PrimaryText,
  },
});
