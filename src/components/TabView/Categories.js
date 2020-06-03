import React from 'react';
import { FlatList, Text, View, } from 'react-native';
import Header from '../Header/index';
import Category from '../Category/index';
import Button from '../Button/index';
import colors from '../../styles/colors';

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ["health", "workout", "work", "study", "payment", "entertainment"],
      showNotice: false,
    };
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.Background }}>
        <Header title="CATEGORIES" />
        <Button.Menu onPress={this.toggleDrawer} />
        <FlatList 
          data={this.state.categories}
          keyExtractor={(item, index) => item + index}
          renderItem={obj => (
            <View style={{ alignItems: "center", justifyContent: "center", padding: 10, }}>
              <Category name={obj.item} size={100} />
              <Text style={{ color: "dimgrey" }} >
                {obj.item.charAt(0).toUpperCase() + obj.item.slice(1)}
              </Text>
            </View>
          )}
          numColumns={3}
        />
        <Button.Notice />
      </View>
    );
  }
};
