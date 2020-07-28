import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SectionList } from 'react-native';
import { connect } from 'react-redux';

import AntDesgin from 'react-native-vector-icons/AntDesign';

import colors from '../../styles/colors';


class HomeView extends React.Component {
  constructor(props) {
    super(props);
  }

  renderItem = ({ item }) =>
    <TouchableOpacity style={styles.group} onPress={() => {this.props.navigation.navigate('group',{gid: item.gid})}}>
      <Text 
        style={[
          styles.itemText,
          { 
            color: this.props.customize.theme.PrimaryText, 
            fontSize: this.props.customize.fontSize.PrimaryText, 
            fontFamily: this.props.customize.font 
          }
        ]}>{item.name}</Text>
    </TouchableOpacity>

  renderSectionHeader = ({ section }) => 
    <TouchableOpacity style={[styles.container, { backgroundColor: this.props.customize.theme.Overlay }]} >
      <Text 
        style={[
          styles.menuText,
          { 
            color: this.props.customize.theme.TitleText, 
            fontSize: this.props.customize.fontSize.TitleText, 
            fontFamily: this.props.customize.font 
          }
        ]}>{section.title}</Text>
    </TouchableOpacity>

  filterGroups = groupList => {
    const obj = {
      "Groups you're managing": [],
      "Groups you're in": [],
    };
    groupList.forEach(group => {
      const title = (group.admins.includes(this.props.userData.data.username)) ? 
        "Groups you're managing" : "Groups you're in";
      obj[title] = [...obj[title], group];
    });
    return obj;
  }

  render() {
    const theme = this.props.customize.theme;
    const groups = this.filterGroups([...this.props.groupData]);
    const sections = Object.keys(groups).map(key => ({
      data: groups[key],
      title: key,
    }));

    return (
      <View style={{ flex: 1, backgroundColor: theme.Background }}>
        <SectionList 
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
        />
        <TouchableOpacity style={styles.createGroupButton} onPress={() => this.props.navigation.navigate("create-group")}>
          <AntDesgin name="addusergroup" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.userData,
  groupData: state.groupData,
  customize: state.customize,
});

export default connect(mapStateToProps)(HomeView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginTop: 10,
    marginHorizontal: 8,
    borderRadius: 20,
  }, 
  menuText: {
    paddingVertical: 8,
    marginLeft: 8,
  },
  itemText: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  group: {
    borderColor: colors.Border,
    borderBottomWidth: 0.5,
    marginHorizontal: 20,
  },
  createGroupButton: {
    backgroundColor: colors.SecondaryColor,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 15,
    right: 15,
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});
