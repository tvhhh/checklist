import React from 'react';
import { View, } from 'react-native';

import Header from '../Header';
import TaskList from '../TaskList';
import { Menu, Notice, Search } from '../Button';
import { connect } from 'react-redux';
import colors from '../../styles/colors';


class List extends React.Component {
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  render() {
    const theme = this.props.customize.darkTheme ? colors.DarkBackground: colors.LightBackground;
    return (
      <View style={{flex: 1, backgroundColor: theme}}>
        <Header title={this.props.title} />
        <Menu onPress={this.toggleDrawer} />
        <Search
          position={{ position: "absolute", top: 12, right: 45, }}
          onPress={() => this.props.navigation.navigate("Search",{
            taskList: this.props.taskList,
          })}
          {...this.props.onRemoveTask}
        />
        <Notice onPress={() => this.props.navigation.navigate("Notice")} />
        <TaskList title={this.props.title} />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  customize: state.customize,
});

export default connect(mapStateToProps)(List);