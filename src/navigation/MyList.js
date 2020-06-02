import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabView } from 'react-native-tab-view';
import List from '../components/TabView/List';
import Calendar from '../components/TabView/Calendar';
import Categories from '../components/TabView/Categories';
import Notification from '../components/Notification/Notification';

const Stack = createStackNavigator();

class SwipeableListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "day", title: "My Day" },
        { key: "week", title: "My Week"},
        { key: "pinned", title: "Pinned"},
        { key: "calendar", title: "Calendar" },
        { key: "categories", title: "Categories" },
      ],
      list: [],
    };
  }

  createTask = task => {
    this.setState({ 
      list: [
        ...this.state.list, 
        { id: this.state.list.length, ...task }
      ],
    });
  }

  editTask = (task, selected) => {
    const index = selected.id;
    this.setState({
      list: [
        ...this.state.list.slice(0, index),
        { id: index, ...task },
        ...this.state.list.slice(index + 1),
      ],
    });
  }

  removeTask = selected => {
    const index = selected.id;
    this.setState({
      list: [
        ...this.state.list.slice(0, index),
        ...(this.state.list.slice(index + 1).map(item => ({
          ...item,
          id: item.id - 1,
        }))),
      ],
    });
  }

  renderScene = ({route}) => {
    switch(route.key) {
      case "day":
        return (
          <List 
            title="MY DAY" 
            navigation={this.props.navigation}
            taskList={this.state.list}
            onCreateTask={this.createTask}
            onEditTask={this.editTask}
            onRemoveTask={this.removeTask} 
          />
        );
      case "week":
        return (
          <List 
            title="MY WEEK" 
            navigation={this.props.navigation}
            taskList={this.state.list}
            onCreateTask={this.createTask}
            onEditTask={this.editTask}
            onRemoveTask={this.removeTask} 
          />
        );
      case "pinned":
        return (
          <List 
            title="PINNED" 
            navigation={this.props.navigation}
            taskList={this.state.list}
            onCreateTask={this.createTask}
            onEditTask={this.editTask}
            onRemoveTask={this.removeTask} 
          />
        );
      case "calendar":
        return <Calendar navigation={this.props.navigation} />
      case "categories":
        return <Categories navigation={this.props.navigation} />
    }
  }

  render() {
    return (
      <TabView
        navigationState={{...(this.state)}}
        renderScene={this.renderScene}
        onIndexChange={index => this.setState({index})}
        renderTabBar={() => null}
      />
    );
  }
};

export default class MyList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="List" component={SwipeableListView} />
        <Stack.Screen name="Notice" component={Notification} />
      </Stack.Navigator>
    );
  }
};
