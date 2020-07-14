import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SwipeableView from '../components/Screens/SwipeableView';
import Search from '../components/Screens/Search';
import Notification from '../components/Screens/Notification';


const Stack = createStackNavigator();


const STORAGE_KEY = "@TodoListApp:TaskDB";

class SwipeableListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "day", title: "My Day" },
        { key: "week", title: "My Week" },
        { key: "pinned", title: "Pinned" },
        { key: "calendar", title: "Calendar" },
        { key: "categories", title: "Categories" },
      ],
      list: [],
    };
  }

  componentDidMount = () => {
    fetchData(STORAGE_KEY)
    .then(data => {
      if (data !== null) {
        const fetchedList = data.map(item => ({
          ...item,
          id: parseInt(item.id),
          dueTime: new Date(item.dueTime),
          pinned: item.pinned == 'true',
          done: item.done == 'true',
        }));
        this.setState({ list: fetchedList });
      }
    }).catch(error => console.log(error));
  }

  createTask = task => {
    const newList = [
      ...this.state.list,
      { id: this.state.list.length, ...task },
    ];
    this.setState({ list: newList });
    storeData(STORAGE_KEY, JSON.stringify(newList)).catch(error => console.log(error));
  }

  editTask = (task, selected) => {
    const index = selected.id;
    const newList = [
      ...this.state.list.slice(0, index),
      { id: index, ...task },
      ...this.state.list.slice(index + 1),
    ];
    this.setState({ list: newList });
    storeData(STORAGE_KEY, JSON.stringify(newList)).catch(error => console.log(error));
  }

  removeTask = selected => {
    const index = selected.id;
    const newList = [
      ...this.state.list.slice(0, index),
      ...(this.state.list.slice(index + 1).map(item => ({
        ...item,
        id: item.id - 1,
      }))),
    ];
    this.setState({ list: newList });
    storeData(STORAGE_KEY, JSON.stringify(newList)).catch(error => console.log(error));
  }

  renderScene = ({route}) => {
    const listProps = {
      navigation: this.props.navigation,
      taskList: this.state.list,
      onCreateTask: this.createTask,
      onEditTask: this.editTask,
      onRemoveTask: this.removeTask,
    };
    switch(route.key) {
      case "day":
        return <List title="MY DAY" {...listProps} />
      case "week":
        return <List title="MY WEEK" {...listProps} />
      case "pinned":
        return <List title="PINNED" {...listProps} />
      case "calendar":
        return  <Calendar {...listProps} />
      case "categories":
        return <Categories {...listProps} />
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
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="List" component={SwipeableView} />
        <Stack.Screen name="Notice" component={Notification} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    );
  }
};
