import React from 'react';
import { SectionList, Text, View, } from 'react-native';
import Task from '../TaskList/Task';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const sections = [{
      title: "Notifications",
      data: this.props.upcomingList,
    }];

    return (
      <View>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={obj => <Task {...(obj.item)} />}
          renderSectionHeader={obj => 
            <Text style={{ color: "dimgrey", fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 5, }}>
              {obj.section.title}
            </Text>
          } 
        />
      </View>
    );
  }
};
