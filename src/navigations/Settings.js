import React from 'react';
import { View, Switch, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/Header';

import colors from '../styles/colors';

import * as actions from '../redux/actions/CustomizeActions';


class Settings extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      switchValue: this.props.customize.switchValue,
      fontSizeOverlayShown: false,
      isFontDropDownVisible: false,
      isFontSizeDropDownVisible: false,
    }
  }

  toggleSwitch = () => {
    const actions = this.props.actions;
    actions.changeTheme();
    this.setState({switchValue: !this.state.switchValue});
 }

  onFontPress = font => {
    const actions = this.props.actions;
    actions.changeFont(font);
  }

  onFontSizePress = size => {
    const actions = this.props.actions;
    actions.changeSize(size);
  }
  
  onFontDropDownPress = () => {
    this.setState({isFontDropDownVisible: !this.state.isFontDropDownVisible});
  }

  onFontSizeDropDownPress = () => {
    this.setState({isFontSizeDropDownVisible: !this.state.isFontSizeDropDownVisible});
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
            <TouchableOpacity style={[styles.container, {backgroundColor: theme.Overlay, height: fonts.TitleText + 20}]} onPress={this.toggleSwitch} >
              <Text style={[styles.options, {color: theme.TitleText, fontSize: fonts.TitleText, fontFamily: font}]}>Dark Theme</Text>
              <Switch
                style={{flex: 1, marginRight: 20}}
                trackColor={{ false: "#767577", true: "grey" }}
                thumbColor={"white"}
                onValueChange = {this.toggleSwitch}
                value = {this.state.switchValue}
                />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.container, {backgroundColor: theme.Overlay, height: fonts.TitleText + 20}]} onPress={() => this.onFontDropDownPress()}>
              <Text style={[styles.options, {color: theme.TitleText, fontSize: fonts.TitleText, fontFamily: font}]}>Font</Text>
              {font === "sans-serif" ? <Text style={{marginRight: 20, color: "grey", fontSize: fonts.TitleText, fontFamily: font}}>Sans Serif</Text> : null}
              {font === "monospace" ? <Text style={{marginRight: 20, color: "grey", fontSize: fonts.TitleText, fontFamily: font}}>Monospace</Text> : null}
              {font === "PlayfairDisplaySC-Regular" ? <Text style={{marginRight: 20, color: "grey", fontSize: fonts.TitleText, fontFamily: font}}>Play Fair</Text> : null}
              {font === "Walkway_Oblique_Bold" ? <Text style={{marginRight: 20, color: "grey", fontSize: fonts.TitleText, fontFamily: font}}>Walkway Oblique</Text> : null}
              {font === "Cabal-w5j3" ? <Text style={{marginRight: 20, color: "grey", fontSize: fonts.TitleText, fontFamily: font}}>Cabal</Text> : null}
              {font === "Lobster_1.3" ? <Text style={{marginRight: 20, color: "grey", fontSize: fonts.TitleText, fontFamily: font}}>Lobster</Text> : null}
            </TouchableOpacity>
            {this.state.isFontDropDownVisible ? 
              <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.dropDownContainer} onPress={() => this.onFontPress("sans-serif")}>
                  <Text style={[styles.dropDownOptions, {color: "grey", fontFamily: "sans-serif",  fontSize: fonts.TitleText}]}>Sans Serif</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropDownContainer}  onPress={() => this.onFontPress("monospace")}>
                  <Text style={[styles.dropDownOptions, {color: "grey", fontFamily: "monospace", fontSize: fonts.TitleText}]}>Monospace</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropDownContainer}  onPress={() => this.onFontPress("PlayfairDisplaySC-Regular")}>
                  <Text style={[styles.dropDownOptions, {color: "grey", fontFamily: "PlayfairDisplaySC-Regular",  fontSize: fonts.TitleText}]}>Play Fair</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropDownContainer}  onPress={() => this.onFontPress("Walkway_Oblique_Bold")}>
                  <Text style={[styles.dropDownOptions, {color: "grey", fontFamily: "Walkway_Oblique_Bold",  fontSize: fonts.TitleText}]}>Walkway Oblique</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropDownContainer}  onPress={() => this.onFontPress("Cabal-w5j3")}>
                  <Text style={[styles.dropDownOptions, {color: "grey", fontFamily: "Cabal-w5j3",  fontSize: fonts.TitleText}]}>Cabal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropDownContainer}  onPress={() => this.onFontPress("Lobster_1.3")}>
                  <Text style={[styles.dropDownOptions, {color: "grey", fontFamily: "Lobster_1.3",  fontSize: fonts.TitleText}]}>Lobster</Text>
                </TouchableOpacity>
              </View> : null}
            <TouchableOpacity style={[styles.container, {backgroundColor: theme.Overlay, height: fonts.TitleText + 20}]} onPress={() => this.onFontSizeDropDownPress()}>
              <Text style={[styles.options, {color: theme.TitleText, fontSize: fonts.TitleText, fontFamily: font}]}>Font Size</Text>
              {fonts.TitleText === 20 ? <Text style={{marginRight: 20, color: "grey", fontSize: fonts.TitleText, fontFamily: font}}>Small</Text> : null}
              {fonts.TitleText === 25 ? <Text style={{marginRight: 20, color: "grey", fontSize: fonts.TitleText, fontFamily: font}}>Medium</Text> : null}
              {fonts.TitleText === 30 ? <Text style={{marginRight: 20, color: "grey", fontSize: fonts.TitleText, fontFamily: font}}>Large</Text> : null}
            </TouchableOpacity>
            {this.state.isFontSizeDropDownVisible ? 
              <View style={{ flex: 1}}>
                <TouchableOpacity style={styles.dropDownContainer} onPress={() => this.onFontSizePress("small")}>
                  <Text style={[styles.dropDownOptions, {color: "grey", fontFamily: font,  fontSize: fonts.TitleText}]}>Small</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropDownContainer}  onPress={() => this.onFontSizePress("medium")}>
                  <Text style={[styles.dropDownOptions, {color: "grey", fontFamily: font, fontSize: fonts.TitleText}]}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropDownContainer}  onPress={() => this.onFontSizePress("large")}>
                  <Text style={[styles.dropDownOptions, {color: "grey", fontFamily: font,  fontSize: fonts.TitleText}]}>Large</Text>
                </TouchableOpacity>
              </View> : null}
          </ScrollView>
        </View> 
      </>  
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderRadius: 25,
  },
  options: {
    marginLeft: 30, 
  },
  dropDownContainer: {
    borderBottomWidth: 0.7, 
    borderColor: colors.Button,
    borderRadius: 50,
    paddingBottom: 3,
    paddingTop: 3,
  },
  dropDownOptions: {
    paddingLeft: 30,
  }
});

const mapStateToProps = state => ({
  customize: state.customize,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
