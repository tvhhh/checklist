import React from 'react';
import { FlatList, StyleSheet, Text, View, } from 'react-native';

import Header from '../Header';
import Category from '../Category';

import screenStyles from './ScreenStyles';
import colors from '../../styles/colors';


export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      categories: ["uncategorized","health", "workout", "work", "study", "payment", "entertainment"],
=======
      categories: [
        "health", "workout", "ideas",
        "work", "payment", "entertainment",
        "meeting", "study", "event",
      ],
>>>>>>> 0ee3df3a12c85502f1c030477b4315b9aee7ce78
    };
  }

  render() {
    return (
      <View style={[screenStyles.screenContainer, styles.container]}>
<<<<<<< HEAD
        <Header title={this.props.title} />
        <Menu onPress={this.toggleDrawer} />
        <Search
          position={{ position: "absolute", top: 12, right: 45, }}
          onPress={() => this.props.navigation.navigate("Search")}
=======
        <Header
          navigation={this.props.navigation} 
          title={this.props.title}
          search={true}
          notice={true}
>>>>>>> 0ee3df3a12c85502f1c030477b4315b9aee7ce78
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
    fontSize: 12,
  },
});
