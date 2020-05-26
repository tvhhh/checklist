import React from 'react';
import { TabView } from 'react-native-tab-view';
import List from './List';
import Calendar from './Calendar';
import Categories from './Categories';

export default class MyList extends React.Component {
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
      ]
    }
  }

  renderScene = ({route}) => {
    switch(route.key) {
      case "day":
        return <List title="MY DAY" navigation={this.props.navigation} />
      case "week":
        return <List title="MY WEEK" navigation={this.props.navigation} />
      case "pinned":
        return <List title="PINNED" navigation={this.props.navigation} />
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
