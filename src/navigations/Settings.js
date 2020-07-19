import React from 'react';
import { View, Switch, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/Header';
import { FontSizeForm, FontForm } from '../components/Forms/CustomizeForm';

import colors, { lightTheme, darkTheme } from '../styles/colors';
import { smallFonts, mediumFonts, largeFonts } from '../styles/fonts';

import * as actions from '../redux/actions/CustomizeActions';


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
    //this.setState({fontSizeOverlayShown: false});
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
    const theme = this.props.customize.theme;
    const fonts = this.props.customize.fontSize;
    const font = this.props.customize.font;
    return (
      <>
        <View style={{ flex: 1, backgroundColor: theme.Background }}>
          <Header navigation={this.props.navigation} title="SETTINGS"/>
          <ScrollView style={{flex: 1}}>
            <TouchableOpacity style={styles.container} onPress={this.toggleSwitch} >
              <Text style={[styles.options, {color: theme.TitleText, fontSize: fonts.TitleText, fontFamily: font}]}>Dark Theme</Text>
              <Switch
                style={{flex: 1, marginRight: 10}}
                trackColor={{ false: "#767577", true: "grey" }}
                thumbColor={"white"}
                onValueChange = {this.toggleSwitch}
                value = {this.state.switchValue}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.container} onPress={this.onFontOverlayPress}>
              <Text style={[styles.options, {color: theme.TitleText, fontSize: fonts.TitleText, fontFamily: font}]}>Font</Text>
              {font === "sans-serif" ? <Text style={{marginRight: 10, color: "grey", fontSize: fonts.TitleText, fontFamily: font}}>Sans Serif</Text> : null}
              {font === "monospace" ? <Text style={{marginRight: 10, color: "grey", fontSize: fonts.TitleText, fontFamily: font}}>Monospace</Text> : null}
              {font === "sans-serif-light" ? <Text style={{marginRight: 10, color: "grey", fontSize: fonts.TitleText, fontFamily: font}}>Sans Serif Light</Text> : null}
            </TouchableOpacity>
            <TouchableOpacity style={styles.container} onPress={this.onFontSizeOverlayPress}>
              <Text style={[styles.options, {color: theme.TitleText, fontSize: fonts.TitleText, fontFamily: font}]}>Font Size</Text>
              {fonts.TitleText === 20 ? <Text style={{marginRight: 10, color: "grey", fontSize: fonts.TitleText, fontFamily: font}}>Small</Text> : null}
              {fonts.TitleText === 25 ? <Text style={{marginRight: 10, color: "grey", fontSize: fonts.TitleText, fontFamily: font}}>Medium</Text> : null}
              {fonts.TitleText === 30 ? <Text style={{marginRight: 10, color: "grey", fontSize: fonts.TitleText, fontFamily: font}}>Large</Text> : null}
            </TouchableOpacity>
          </ScrollView>
        </View> 
        <Overlay
            isVisible={this.state.fontOverlayShown}
            width={250}
            height={150}
            overlayStyle={[styles.overlay, {borderColor: theme.Overlay}]}
            onBackdropPress={this.onFontBackPress}
        >
          <FontForm theme={theme.Background} textColor={theme.PrimaryText} fontSize={fonts.TitleText} onPress={this.onFontPress}/>
        </Overlay>
        <Overlay
            isVisible={this.state.fontSizeOverlayShown}
            width={250}
            height={150}
            overlayStyle={[styles.overlay, {borderColor: theme.Overlay}]}
            onBackdropPress={this.onFontSizeBackPress}
        >
          <FontSizeForm theme={theme.Background} textColor={theme.PrimaryText} fontSize={fonts.TitleText} onPress={this.onFontSizePress}/>
        </Overlay>
      </>  
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    marginTop:10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomColor: colors.Border,
  },
  options: {
    marginLeft: 30, 
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
