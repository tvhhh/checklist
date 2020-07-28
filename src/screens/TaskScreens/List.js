import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import TaskList, { FILTER_TODAY, FILTER_WEEK, FILTER_PINNED } from '../../components/TaskList';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from '../../styles/colors';


class List extends React.Component {
  getFilter = () => {
    switch(this.props.title) {
      case "MY DAY":
        return { filterOption: FILTER_TODAY };
      case "MY WEEK":
        return { filterOption: FILTER_WEEK };
      case "PINNED":
        return { filterOption: FILTER_PINNED };
      default:
        return this.props.route.params;
    }
  }

  render() {
    const theme = this.props.customize.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;

    const filter = this.getFilter();
    return (
      <View style={{flex: 1, backgroundColor: theme.Background}}>
        {this.props.headerMode ?
          <Header
            navigation={this.props.navigation} 
            title={this.props.title}
            search={true}
            notice={true}
          /> : null
        }
        <TaskList
          {...filter}
          create={true}
          listEmptyComponent={
            <View style={styles.emptyComponent}>
              <MaterialIcons name="done-all" color={colors.PrimaryColor} size={120} />
              <Text style={{ color: theme.PrimaryText, fontSize: fonts.HeavyText, fontFamily: font }}>You're all done here!</Text>
              <Text style={{ color: theme.SecondaryText, fontSize: fonts.PrimaryText, fontFamily: font }}>Tap + to create a new task</Text>
            </View>
          }
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  emptyComponent: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 180,
  },
});

const mapStateToProps = state => ({
  customize: state.customize,
});

export default connect(mapStateToProps)(List);
