import React from 'react';
import { TabView } from 'react-native-tab-view';

import List from './List';
import Calendar from './Calendar';
import Categories from './Categories';


class SwipeableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "day", title: "MY DAY" },
        { key: "week", title: "MY WEEK" },
        { key: "pinned", title: "PINNED" },
        { key: "calendar", title: "CALENDAR" },
        { key: "categories", title: "CATEGORIES" },
      ],
    };
  }

  renderScene = ({ route }) => {
    switch(route.key) {
      case "day":
        return <List title={route.title} navigation={this.props.navigation} />
      case "week":
        return <List title={route.title} navigation={this.props.navigation} />
      case "pinned":
        return <List title={route.title} navigation={this.props.navigatiom} />
      case "calendar":
        return  <Calendar title={route.title} navigation={this.props.navigatiom} />
      case "categories":
        return <Categories title={route.title} navigation={this.props.navigatiom} />
      default:
        return null;
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

export default SwipeableView;
