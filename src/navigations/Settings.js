import React from 'react';
import { View, Switch, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu } from '../components/Button';
import colors from '../styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions/CustomizeActions';

class Settings extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      switchValue: false,
    }
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  toggleSwitch = () => {
    const actions = this.props.actions;
    actions.changeTheme();
    this.setState({switchValue: !this.state.switchValue});
 }

  render() {
    const theme = this.props.darkTheme ? colors.DarkBackground : colors.LightBackground;
    const textColor = this.props.darkTheme ? "white" : "black";
    return (
      <View style={{ flex: 1, backgroundColor: theme }}>
        <Menu onPress={this.toggleDrawer} />
        <ScrollView style={{flex: 1, marginTop: 80,}}>
        <TouchableOpacity style={style.container} onPress={this.toggleSwitch} >
          <Text style={{
            marginLeft: 30, 
            fontSize: 25, 
            //fontFamily: 'monospace',
            color: textColor}}
          >Dark Theme</Text>
          <Switch
            style={{flex: 1, marginRight: 20}}
            trackColor={{ false: "#767577", true: "grey" }}
            thumbColor={"white"}
            onValueChange = {this.toggleSwitch}
            value = {this.state.switchValue}
            />
        </TouchableOpacity>
        <TouchableOpacity style={style.container}>
        <Text style={{
            marginLeft: 30, 
            fontSize: 25, 
            //fontFamily: 'monospace',
            color: textColor}}
          >Font</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  darkTheme: state.customize.darkTheme,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

const style=StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 2,
    marginTop:10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomColor: "grey",
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Settings);