import React from 'react';
import { FlatList, Text, View, } from 'react-native';
import Category from '../Category/index';

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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 20, paddingBottom: 20, }}>
        <FlatList 
          data={this.state.categories}
          keyExtractor={(item, index) => item + index}
          renderItem={obj => (
            <View style={{ alignItems: "center", height: 80, width: 90, }}>
              <Category 
                name={obj.item} 
                onPress={() => this.handleSubmit(obj.item)} 
              />
              <Text style={{ color: "dimgrey", fontSize: 12 }} >
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
