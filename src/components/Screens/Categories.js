import React from 'react';
import { FlatList, StyleSheet, Text, View, } from 'react-native';

import Header from '../Header';
import Category from '../Category';

import { connect } from 'react-redux';

import screenStyles from './ScreenStyles';
import colors from '../../styles/colors';


class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        "health", "workout", "ideas",
        "work", "payment", "entertainment",
        "meeting", "study", "event",
      ],
    };
  }

  render() {
    const theme = this.props.customize.darkTheme ? colors.DarkBackground : colors.LightBackground;
    const textColor = this.props.customize.darkTheme ? colors.DarkPrimaryText : colors.LightPrimaryText;
    const fontSize = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
<View style={[screenStyles.screenContainer, styles.container, {backgroundColor: theme}]}>
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

const mapStateToProps = state => ({
  customize: state.customize,
});
export default connect(mapStateToProps)(Categories);
