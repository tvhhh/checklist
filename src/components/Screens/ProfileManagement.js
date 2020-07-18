import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../Header';
import { AvatarPicker, NameBox, PhoneBox, PasswordBox, ConfirmPasswordBox } from '../Forms/UserInformationForm';
import ConfirmationBox from '../Forms/ConfirmationBox';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontTisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import screenStyles from './ScreenStyles';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { setAvatar, setName, setPhone, setPassword, logOut, removeAccount } from '../../redux/actions/UserDataActions';


class ProfileManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAvatarPickerVisible: false,
      isNameBoxVisible: false,
      isPhoneBoxVisible: false,
      isPasswordBoxVisible: false,
      isConfirmPasswordBoxVisible: false,
      isConfirmationBoxVisible: false,
    };
  }

  toggleAvatarPicker = () => {
    this.setState({ isAvatarPickerVisible: !this.state.isAvatarPickerVisible });
  }

  handleAvatarSubmit = color => {
    this.props.setAvatar(color);
    this.setState({ isAvatarPickerVisible: false });
  }

  toggleNameBox = () => {
    this.setState({ isNameBoxVisible: !this.state.isNameBoxVisible });
  }

  handleNameSubmit = name => {
    this.props.setName(name);
    this.setState({ isNameBoxVisible: false });
  }

  togglePhoneBox = () => {
    this.setState({ isPhoneBoxVisible: !this.state.isPhoneBoxVisible });
  }

  handlePhoneSubmit = phone => {
    this.props.setPhone(phone);
    this.setState({ isPhoneBoxVisible: false });
  }

  togglePasswordBox = () => {
    this.setState({ isPasswordBoxVisible: !this.state.isPasswordBoxVisible });
  }

  handlePasswordSubmit = password => {
    this.props.setPassword(password);
    this.setState({ isPasswordBoxVisible: false });
  }

  toggleConfirmPasswordBox = () => {
    this.setState({ isConfirmPasswordBoxVisible: !this.state.isConfirmPasswordBoxVisible });
  }

  handleConfirmPasswordSuccess = () => {
    this.setState({ isConfirmPasswordBoxVisible: false, isConfirmationBoxVisible: true });
  }

  toggleConfirmationBox = () => {
    this.setState({ isConfirmationBoxVisible: !this.state.isConfirmationBoxVisible })
  }

  handleRemoveAccountConfirm = () => {
    this.props.removeAccount(this.props.appData.data.username);
  }

  render() {
    const data = this.props.appData.data;
    return (
      <ScrollView style={screenStyles.screenContainer}>
        <Header navigation={this.props.navigation} />
        <View style={styles.header}>
          <FontAwesome
            style={styles.userAvatar}
            name="user-circle"
            color={data.avatar || "dimgrey"}
            size={100}
            onPress={this.toggleAvatarPicker}
          />
          <Text style={[styles.username, {color: data.avatar}]}>{`@${data.username}`}</Text>
        </View>
        <View style={styles.statisticContainer}>
          <TouchableOpacity style={styles.statisticBox}>
            <Text style={[styles.statisticText, {color: colors.DisabledColor}]}>You have</Text>
            <Text style={[styles.statisticNumber, {color: colors.DisabledColor}]}>
              {data.tasks.filter(task => task.dueTime < new Date() && !task.done).length}
            </Text>
            <Text style={[styles.statisticText, {color: colors.DisabledColor}]}>OVERDUED</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statisticBox} onPress={() => this.props.navigation.navigate("UpcomingTasks")}>
            <Text style={[styles.statisticText, {color: colors.PrimaryColor}]}>You have</Text>
            <Text style={[styles.statisticNumber, {color: colors.PrimaryColor}]}>
              {data.tasks.filter(task => task.dueTime > new Date() && !task.done).length}
            </Text>
            <Text style={[styles.statisticText, {color: colors.PrimaryColor}]}>UPCOMING</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statisticBox}>
            <Text style={[styles.statisticText, {color: colors.SecondaryColor}]}>You have</Text>
            <Text style={[styles.statisticNumber, {color: colors.SecondaryColor}]}>
              {data.tasks.filter(task => task.done).length}
            </Text>
            <Text style={[styles.statisticText, {color: colors.SecondaryColor}]}>COMPLETED</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.infoField} onPress={this.toggleNameBox}>
          <AntDesign name="contacts" size={30} color={colors.PrimaryColor} />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Full Name</Text>
            <Text style={styles.info}>{data.name || "What's your name?"}</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={30} color={colors.Button} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoField}>
          <FontTisto name="email" size={30} color={colors.PrimaryColor} />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Email</Text>
            <Text style={styles.info}>{data.email}</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={30} color={colors.Button} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoField} onPress={this.togglePhoneBox}>
          <FontTisto name="phone" size={30} color={colors.PrimaryColor} />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Phone number</Text>
            <Text style={styles.info}>{data.phone || "Update your phone number"}</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={30} color={colors.Button} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoField} onPress={this.togglePasswordBox}>
          <FontAwesome name="key" size={30} color={colors.PrimaryColor} />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Change password</Text>
            <Text style={styles.info}>Reset your password</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={30} color={colors.Button} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoField} onPress={this.toggleConfirmPasswordBox}>
          <MaterialCommunityIcons name="account-remove" size={30} color={colors.PrimaryColor} />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Deactivate account</Text>
            <Text style={styles.info}>Remove your account</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={30} color={colors.Button} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logOut} onPress={this.props.logOut}>
          <Text style={styles.logOutText}>LOG OUT</Text>
          <MaterialCommunityIcons name="logout" size={25} color="white" />
        </TouchableOpacity>
        <Overlay
          isVisible={this.state.isAvatarPickerVisible}
          onBackdropPress={this.toggleAvatarPicker}
          overlayStyle={styles.avatarPicker}
        >
          <AvatarPicker setAvatar={this.handleAvatarSubmit} />
        </Overlay>
        <Overlay
          isVisible={this.state.isNameBoxVisible}
          onBackdropPress={this.toggleNameBox}
          overlayStyle={styles.nameBox}
        >
          <NameBox
            name={data.name}
            setName={this.handleNameSubmit}
          />
        </Overlay>
        <Overlay
          isVisible={this.state.isPhoneBoxVisible}
          onBackdropPress={this.togglePhoneBox}
          overlayStyle={styles.phoneBox}
        >
          <PhoneBox
            phone={data.phone}
            setPhone={this.handlePhoneSubmit}
          />
        </Overlay>
        <Overlay
          isVisible={this.state.isPasswordBoxVisible}
          onBackdropPress={this.togglePasswordBox}
          overlayStyle={styles.passwordBox}
        >
          <PasswordBox
            currentPassword={data.password}
            setPassword={this.handlePasswordSubmit}
          />
        </Overlay>
        <Overlay
          isVisible={this.state.isConfirmPasswordBoxVisible}
          onBackdropPress={this.toggleConfirmPasswordBox}
          overlayStyle={styles.confirmPasswordBox}
        >
          <ConfirmPasswordBox
            currentPassword={data.password}
            onConfirmSuccess={this.handleConfirmPasswordSuccess}
          />
        </Overlay>
        <Overlay
          isVisible={this.state.isConfirmationBoxVisible}
          onBackdropPress={this.toggleConfirmationBox}
          overlayStyle={styles.confirmationBox}
        >
          <ConfirmationBox 
            title="Delete this account?"
            onCancel={this.toggleConfirmationBox}
            onConfirm={this.handleRemoveAccountConfirm}
          />
        </Overlay>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  header: {   
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  username: {
    fontSize: fonts.TitleText,
  },
  userAvatar: {
    backgroundColor: "white",
    borderRadius: 50,
  },
  statisticContainer: {
    flexDirection: "row"
  },
  statisticBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginBottom: 10,
    borderColor: colors.Border,
    borderRightWidth: 0.5,
  },
  statisticNumber: {
    fontSize: fonts.HeavyText,
  },
  statisticText: {
    fontSize: fonts.TertiaryText,
  },
  infoField: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  infoText: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoTitle: {
    color: colors.TitleText,
    fontSize: fonts.PrimaryText,
    fontWeight: "bold",
  },
  info: {
    color: colors.PrimaryText,
    fontSize: fonts.PrimaryText,
  },
  logOut: {
    flexDirection: "row",
    backgroundColor: colors.SecondaryColor,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 40,
    padding: 5,
  },
  logOutText: {
    color: "white",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  avatarPicker: {
    height: 160,
    width: 300,
    borderRadius: 5,
  },
  nameBox: {
    height: 200,
    width: 300,
    borderRadius: 5,
  },
  phoneBox: {
    height: 200,
    width: 300,
    borderRadius: 5,
  },
  passwordBox: {
    height: 300,
    width: 300,
    borderRadius: 5,
  },
  confirmPasswordBox: {
    height: 220,
    width: 300,
    borderRadius: 5,
  },
  confirmationBox: {
    height: 150,
    width: 300,
    borderRadius: 5,
  },
  alertBox: {
    height: 150,
    width: 300,
    borderRadius: 5,
  },
});

const mapStateToProps = state => ({
  appData: state.userData,
});

const mapDispatchToProps = dispatch => ({
  setAvatar: bindActionCreators(setAvatar, dispatch),
  setName: bindActionCreators(setName, dispatch),
  setPhone: bindActionCreators(setPhone, dispatch),
  setPassword: bindActionCreators(setPassword, dispatch),
  logOut: () => dispatch(logOut()),
  removeAccount: username => dispatch(removeAccount(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileManagement);
