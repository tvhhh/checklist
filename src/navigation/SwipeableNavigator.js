import React from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import List from './List';
import Categories from './Categories';
import CalendarView from './CalendarView';
import WeekList from './WeekView';
import PriorityList from './PriorityView';

export default class SwipeableNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "list", title: "My List" },
        { key: "categories", title: "Categories" },
        { key: "calendar", title: "Calendar" },
        { key: "weeklist", title: "Week List"},
        { key: "prioritylist", title: "Priority List"},
      ]
    }
  }

  renderScene = ({route}) => {
    switch(route.key) {
      case "list":
        return <List navigation={this.props.navigation} />
      case "weeklist":
        return <WeekList />
      case "prioritylist":
        return <PriorityList />
      case "calendar":
        return <CalendarView />
      case "categories":
        return <Categories />
    }
  }

  render() {
    return (
      <TabView
        navigationState={{...(this.state)}}
        // renderScene={SceneMap({
        //   list: List,
        //   categories: Categories,
        //   calendar: CalendarView,
        // })}
        renderScene={this.renderScene}
        onIndexChange={index => this.setState({index})}
        renderTabBar={() => null}
      />
    );
  }
}
