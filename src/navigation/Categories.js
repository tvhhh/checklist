import React from 'react';
import { FlatList, Text, View, } from 'react-native';
import Header from '../components/Header/index';
import Category from '../components/Category/index';
import Button from '../components/Button/index';
import colors from '../styles/colors';

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ["health", "workout", "work", "study", "payment", "entertainment"],
    };
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.Background }}>
        <Header title="CATEGORIES" />
        <FlatList 
          data={this.state.categories}
          keyExtractor={(item, index) => item + index}
          renderItem={obj => (
            <View style={{ alignItems: "center", height: 100, width: 120, margin: 8, }}>
              <Category name={obj.item} size={80} />
              <Text style={{ color: "dimgrey" }} >
                {obj.item.charAt(0).toUpperCase() + obj.item.slice(1)}
              </Text>
            </View>
          )}
          numColumns={3}
        />
        <Button.Menu onPress={() => this.props.navigation.toggleDrawer()} />
        <Button.Notice />
      </View>
    );
  }
};
