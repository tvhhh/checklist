import React from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import List from './List';
import Categories from './Categories';
import CalendarView from './Calendar';

export default class SwipeableNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "list", title: "My List" },
        { key: "categories", title: "Categories" },
        { key: "calendar", title: "Calendar" },
      ]
    }
  }

  render() {
    return (
      <TabView
        navigationState={{...(this.state)}}
        renderScene={SceneMap({
          list: List,
          categories: Categories,
          calendar: CalendarView,
        })}
        onIndexChange={index => this.setState({index})}
        renderTabBar={() => null}
      />
    );
  }
}
