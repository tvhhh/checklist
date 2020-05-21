import React from 'react';
import { TabView } from 'react-native-tab-view';
import List from './List';
import Categories from './Categories';
import Calendar from './Calendar';

export default class SwipeableNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "day", title: "My Day" },
        { key: "week", title: "My Week"},
        { key: "starred", title: "Starred"},
        { key: "categories", title: "Categories" },
        { key: "calendar", title: "Calendar" },
      ]
    }
  }

  renderScene = ({route}) => {
    switch(route.key) {
      case "day":
        return <List title="MY DAY" />
      case "week":
        return <List title="MY WEEK" />
      case "starred":
        return <List title="STARRED" />
      case "calendar":
        return <Calendar />
      case "categories":
        return <Categories />
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
