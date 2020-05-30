import React from 'react';
import { View, } from 'react-native';
import { Overlay } from 'react-native-elements';
import Header from '../Header/index';
import CalendarPicker from '../Calendar/index';
import NoticeBox from '../Notification/index';
import Button from '../Button/index';
import colors from '../../styles/colors';

export default class Calendar extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      showNotice: false,
    }
  }

  toggleNotice = () => {
    this.setState({showNotice: !this.state.showNotice});
  }

  render(){
    return(
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Header title="CALENDAR" />
        <Button.Menu onPress={() => this.props.navigation.toggleDrawer()} />
        <CalendarPicker />
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
