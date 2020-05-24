import React from 'react';
import { View, } from 'react-native';
import { Overlay } from 'react-native-elements';
import NoticeBox from '../components/Notification/index';
import Button from '../components/Button/index';
import colors from '../styles/colors';

export default class Groups extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showNotice: false,
    }
  }

  toggleNotice = () => {
    this.setState({showNotice: !this.state.showNotice});
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Button.Menu onPress={() => this.props.navigation.toggleDrawer()} />
        <Button.Notice onPress={this.toggleNotice} />
        <Overlay 
          isVisible={this.state.showNotice} 
          onBackdropPress={this.toggleNotice}
          overlayStyle={{ 
            borderRadius: 10,
          }}
        >
          <NoticeBox upcomingList={[]} />
        </Overlay>
      </View>
    );
  }
};
