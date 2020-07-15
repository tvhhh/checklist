import React from 'react';
import { View, Switch, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu } from '../components/Button';
import colors from '../styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions/CustomizeActions';
import { Overlay } from 'react-native-elements';
import { FontSizeForm, FontForm } from '../components/Form/CustomizeForm';


class Settings extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      switchValue: this.props.customize.switchValue,
      fontOverlayShown: false,
      fontSizeOverlayShown: false,
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

  onFontPress = font => {
    const actions = this.props.actions;
    actions.changeFont(font);
    this.setState({fontOverlayShown: false});
  }

  onFontSizePress = size => {
    const actions = this.props.actions;
    actions.changeSize(size);
    this.setState({fontSizeOverlayShown: false});
  }
  
  onFontOverlayPress = () => {
    this.setState({fontOverlayShown: true});
  }

  onFontBackPress = () => {
    this.setState({fontOverlayShown: false});
  }

  onFontSizeOverlayPress = () => {
    this.setState({fontSizeOverlayShown: !this.state.fontSizeOverlayShown});
  }

  onFontSizeBackPress = () => {
    this.setState({fontSizeOverlayShown: false});
  }

  render() {
    const theme = this.props.customize.darkTheme ? colors.DarkBackground : colors.LightBackground;
    const textColor = this.props.customize.darkTheme ? colors.DarkPrimaryText : colors.LightPrimaryText;
    const overlayBorderColor = this.props.customize.darkTheme ? colors.DarkOverlay : colors.LightOverlay;
    const fontSize = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <>
        <View style={{ flex: 1, backgroundColor: theme }}>
          <Menu onPress={this.toggleDrawer} />
          <ScrollView style={{flex: 1, marginTop: 80,}}>
            <TouchableOpacity style={styles.container} onPress={this.toggleSwitch} >
              <Text style={[styles.options, {color: textColor, fontSize: fontSize, fontFamily: font}]}>Dark Theme</Text>
              <Switch
                style={{flex: 1, marginRight: 20}}
                trackColor={{ false: "#767577", true: "grey" }}
                thumbColor={"white"}
                onValueChange = {this.toggleSwitch}
                value = {this.state.switchValue}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.container} onPress={this.onFontOverlayPress}>
              <Text style={[styles.options, {color: textColor, fontSize: fontSize, fontFamily: font}]}>Font</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container} onPress={this.onFontSizeOverlayPress}>
              <Text style={[styles.options, {color: textColor, fontSize: fontSize, fontFamily: font}]}>Font Size</Text>
            </TouchableOpacity>
          </ScrollView>
        </View> 
        <Overlay
            isVisible={this.state.fontOverlayShown}
            width={250}
            height={150}
            overlayStyle={[styles.overlay, {borderColor: overlayBorderColor}]}
            onBackdropPress={this.onFontBackPress}
        >
          <FontForm theme={theme} textColor={textColor} onPress={this.onFontPress}/>
        </Overlay>
        <Overlay
            isVisible={this.state.fontSizeOverlayShown}
            width={250}
            height={150}
            overlayStyle={[styles.overlay, {borderColor: overlayBorderColor}]}
            onBackdropPress={this.onFontSizeBackPress}
        >
          <FontSizeForm theme={theme} textColor={textColor} onPress={this.onFontSizePress}/>
        </Overlay>
      </>  
    );
  }
};

const styles=StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 2,
    marginTop:10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomColor: "grey",
  },
  options: {
    marginLeft: 30, 
    fontSize: 25,
  },
  overlay: {
    padding: 0,
    borderWidth: 3,
    borderRadius: 10,
  }
});

const mapStateToProps = state => ({
  customize: state.customize,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);