import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../Header';
import TaskList, { FILTER_TODAY, FILTER_WEEK, FILTER_PINNED } from '../TaskList';


class List extends React.Component {
  getFilter = () => {
    switch(this.props.title) {
      case "MY DAY":
        return { filterOption: FILTER_TODAY };
      case "MY WEEK":
        return { filterOption: FILTER_WEEK };
      case "PINNED":
        return { filterOption: FILTER_PINNED };
      default:
        return this.props.route.params;
    }
  }

  render() {
    const theme = this.props.customize.theme;
    const filter = this.getFilter();
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
          {...filter}
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
