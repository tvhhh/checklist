import React from 'react';
import { TabView } from 'react-native-tab-view';
import List from './List';
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
        { key: "calendar", title: "Calendar" },
      ]
    }
  }

  renderScene = ({route}) => {
    switch(route.key) {
      case "day":
        return <List title="MY DAY" navigation={this.props.navigation} />
      case "week":
        return <List title="MY WEEK" navigation={this.props.navigation} />
      case "starred":
        return <List title="STARRED" navigation={this.props.navigation} />
      case "calendar":
        return <Calendar navigation={this.props.navigation} />
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
