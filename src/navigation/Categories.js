import React from 'react';
import { FlatList, View, } from 'react-native';
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
            <View style={{ height: 100, width: 120, margin: 8, }}>
              <Category name={obj.item} size={80} />
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
