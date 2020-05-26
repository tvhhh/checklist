import React from 'react';
import { View, } from 'react-native';
import Header from '../Header/index';
import CalendarPicker from '../Calendar/index';
import Button from '../Button/index';
import colors from '../../styles/colors';

export default class Calendar extends React.Component{
  constructor (props) {
    super(props);
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  render(){
    return(
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Header title="CALENDAR" />
        <Button.Menu onPress={this.toggleDrawer} />
        <CalendarPicker />
        <Button.Notice />
      </View>
    );
  }
};
