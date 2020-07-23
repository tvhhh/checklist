import React from 'react';
import { TabView } from 'react-native-tab-view';

import List from './List';
import Calendar from './Calendar';
import Categories from './Categories';
import { View } from 'react-native';
import { connect } from 'react-redux';

class SwipeableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      routes: [
        { key: "0", title: "Empty"},
        { key: "day", title: "MY DAY" },
        { key: "week", title: "MY WEEK" },
        { key: "pinned", title: "PINNED" },
        { key: "calendar", title: "CALENDAR" },
        { key: "categories", title: "CATEGORIES" },
        { key: "6", title: "Empty"},
      ],
    };
  }

  renderScene = ({ route }) => {
    const theme = this.props.customize.theme;
    switch(route.key) {
      case "day":
        return <List headerMode={true} title={route.title} navigation={this.props.navigation}/>
      case "week":
        return <List headerMode={true} title={route.title} navigation={this.props.navigation}/>
      case "pinned":
        return <List headerMode={true} title={route.title} navigation={this.props.navigation}/>
      case "calendar":
        return  <Calendar title={route.title} navigation={this.props.navigation}/>
      case "categories":
        return <Categories title={route.title} navigation={this.props.navigation}/>
      default:
        return <View style={{flex: 1, backgroundColor: theme.Background}}/>;
    }
  }

  handleIndexChange = index => {
    if (index === 6) {
      this.setState({index: 1});
      return;
    }
    if (index === 0) {
      this.setState({index: 5});
      return;
    }
    this.setState({index})
  }

  render() {
    return (
      <TabView
        navigationState={{...(this.state)}}
        renderScene={this.renderScene}
        onIndexChange={index => this.handleIndexChange(index)}
        renderTabBar={() => null}
      />
    );
  }
};

const mapStateToProps = state => ({
  customize: state.customize,
});

export default connect(mapStateToProps)(SwipeableView);
