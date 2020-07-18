import React from 'react';

import { connect } from 'react-redux';
import screenStyles from './ScreenStyles';




class Notification extends React.Component {
  render() {
    return (
      <View style={screenStyles.screenContainer}>
        <Text>Notification here</Text>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  customize: state.customize.customize,
});

export default connect(mapStateToProps)(Notification);
