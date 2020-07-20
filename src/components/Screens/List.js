import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../Header';
import TaskList, { FILTER_TODAY, FILTER_WEEK, FILTER_PINNED } from '../TaskList';


class List extends React.Component {
  getFilterOption = () => {
    switch(this.props.title) {
      case "MY DAY":
        return FILTER_TODAY;
      case "MY WEEK":
        return FILTER_WEEK;
      case "PINNED":
        return FILTER_PINNED;
      default:
        return this.props.route.params.filterOption;
    }
  }

  render() {
    const theme = this.props.customize.theme;
    const filterOption = this.getFilterOption();
    return (
      <View style={{flex: 1, backgroundColor: theme.Background}}>
        {this.props.headerMode ?
          <Header
            navigation={this.props.navigation} 
            title={this.props.title}
            search={true}
            notice={true}
          /> : null
        }
        <TaskList
          filterOption={filterOption}
          showEmptyComponent={true}
          create={true}
        />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  customize: state.customize,
});

export default connect(mapStateToProps)(List);
