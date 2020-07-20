import React from 'react';
import { FlatList, StyleSheet, Text, View, } from 'react-native';
import { Overlay } from 'react-native-elements';

import { connect } from 'react-redux';

import TaskList, {FILTER_CATEGORY} from '../TaskList';
import Header from '../Header';
import Category from '../Category';

import { lightTheme } from '../../styles/colors';

import colors from '../../styles/colors';



class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        "health", "workout", "ideas",
        "work", "payment", "liveliness",
        "meeting", "study", "event",
      ],
      showForm: false,
      pickedCategory: "none",
    };
  }

  onFormBackdropPress = () => {
    this.setState({ showForm: false, selected: {} });
  }

  onCategoryPress = category => {
    this.setState({ showForm: true, pickedCategory: category });
  }

  render() {
    const theme = this.props.customize.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <View style={[styles.container, { flex: 1, backgroundColor: theme.Background }]}>
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
              <Category name={item} size={100} onPress={() => this.onCategoryPress(item)} />
              <Text style={{ color: colors[item.charAt(0).toUpperCase() + item.slice(1)] , fontFamily: font, fontSize: fonts.CaptionText}}>
                {item.toUpperCase()}
              </Text>
            </View>
          )}
          numColumns={3}
        />
        <Overlay
          isVisible={this.state.showForm}
          onBackdropPress={this.onFormBackdropPress}
          fullScreen={true}
          overlayStyle={[
            styles.taskForm, 
            { flex: 1, backgroundColor: theme.Background }
          ]}
        >
          <TaskList
            filterOption={FILTER_CATEGORY}
            category={this.state.pickedCategory}
        />
        </Overlay>
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
});

const mapStateToProps = state => ({
  customize: state.customize,
  taskList: state.userData.data.tasks,
});

export default connect(mapStateToProps)(Categories);
