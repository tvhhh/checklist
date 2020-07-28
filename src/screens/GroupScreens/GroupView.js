import React from 'react'
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import TaskList, { FILTER_GROUP_TASKS } from '../../components/TaskList'


class GroupView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gid: this.props.route.params.gid,
      group: this.props.groupData.filter(group => group.gid === this.props.route.params.gid)[0],
    }
  }

  renderHeader(title) {
    const maxLengthForTitle = 15;
    const displayTitle  = title.length >  maxLengthForTitle ?
      title.substring(0, maxLengthForTitle-3) + '...' : title;

    return (
      <View 
        style={[
          styles.header,
          {
            backgroundColor: this.props.customize.theme.Background,
          }
        ]}
      >
        <TouchableOpacity
          style={
            {
              marginRight:20,
              flex:1
            }
          }
          onPress={() => {this.props.navigation.goBack()}}
        >
          <MaterialIcons
            name={"arrow-back"}
            size={25}
            color={this.props.customize.theme.TitleText}
          />
        </TouchableOpacity>
        <Text
          style={
            {
              color: this.props.customize.theme.TitleText, 
              fontSize: this.props.customize.fontSize.TitleText, 
              fontFamily: this.props.customize.font,
              flex: 8,
            }
          }
        >{displayTitle}</Text>
        <TouchableOpacity
          style={
            {
              flex:1,
            }
          }
          onPress={() => {this.props.navigation.navigate('info',{gid: this.props.route.params.gid})}}
        >
          <Octicons 
            name="info"
            size={25}
            color={this.props.customize.theme.PrimaryText}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const group = this.props.groupData.filter(group => group.gid === this.props.route.params.gid)[0];
    return (
      <View
        style={{
            flex: 1,
            backgroundColor: this.props.customize.theme.Background,
        }}
      >
        {this.renderHeader(group? group.name: "nothing goes here")}
        <TaskList 
          filterOption={FILTER_GROUP_TASKS}
          group={group}
          create={true}
        />

        
      </View>
    );
  }
}

const mapStateToProps = state => ({
  groupData: state.groupData,
  userData: state.userData,
  customize: state.customize,
});

export default connect(mapStateToProps)(GroupView);

const styles = StyleSheet.create({
  header: {
    flexDirection:'row',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    color: '#ffffff',
  },
});
