import React from 'react';

import { connect } from 'react-redux';


class Notification extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Notification here</Text>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  customize: state.customize.customize,
});

export default connect(mapStateToProps)(Notification);
