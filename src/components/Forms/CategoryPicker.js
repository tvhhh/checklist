import React from 'react';
import { FlatList, StyleSheet, Text, View, } from 'react-native';
import { connect } from 'react-redux';
import Category from '../Category';

import colors from '../../styles/colors';


class CategoryPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        "health", "workout", "ideas",
        "work", "payment", "entertainment",
        "meeting", "study", "event", "uncategorized","default"
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
    const fontSize = this.props.customize.fontSize;
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
              <Text style={[
                styles.categoryName,
                { color: colors[item.charAt(0).toUpperCase() + item.slice(1)] , fontFamily: font}
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
    fontSize: 10,
  },
});

const mapStateToProps = state => ({
  customize: state.customize,
});

export default connect(mapStateToProps)(CategoryPicker);
