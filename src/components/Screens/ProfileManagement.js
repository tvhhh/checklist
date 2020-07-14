import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { Menu } from '../Button';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontTisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import screenStyles from './ScreenStyles';
import colors from '../../styles/colors';

import { fetchData } from '../../redux/actions/UserDataActions';
import { clearUserData } from '../../api';


class ProfileManagement extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  logOut = async () => {
    await clearUserData();
    this.props.fetchData();
  }

  render() {
    const data = this.props.appData.data;
    return (
      <View style={screenStyles.screenContainer}>
        <Menu onPress={this.toggleDrawer} />
        <View style={styles.header}>
          <FontAwesome
            name="user-circle" 
            color="dimgrey"
            size={100} 
          />
          <Text style={styles.username}>{`@${data.username}`}</Text>
        </View>
        <TouchableOpacity style={styles.infoField}>
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
        <TouchableOpacity style={styles.infoField}>
          <FontTisto name="phone" size={30} color={colors.PrimaryColor} />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Phone number</Text>
            <Text style={styles.info}>{data.phone || "Update your phone number"}</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={30} color={colors.Button} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoField}>
          <FontAwesome name="key" size={30} color={colors.PrimaryColor} />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Change password</Text>
            <Text style={styles.info}>Reset your password</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={30} color={colors.Button} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoField}>
          <MaterialCommunityIcons name="account-remove" size={30} color={colors.PrimaryColor} />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Deactivate account</Text>
            <Text style={styles.info}>Remove your account</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={30} color={colors.Button} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logOut} onPress={this.logOut}>
          <Text style={styles.logOutText}>LOG OUT</Text>
          <MaterialCommunityIcons name="logout" size={25} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  header: {   
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 25,
  },
  username: {
    color: colors.TitleText,
    fontSize: 20,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    color: colors.PrimaryText,
    fontSize: 16,
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
});

const mapStateToProps = state => ({
  appData: state.userData,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileManagement);
