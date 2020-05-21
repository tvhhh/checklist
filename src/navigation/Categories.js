import React from 'react';
import { FlatList, Text, View, } from 'react-native';
import { Overlay } from 'react-native-elements';
import Header from '../components/Header/index';
import Category from '../components/Category/index';
import NoticeBox from '../components/Notification/index';
import Button from '../components/Button/index';
import colors from '../styles/colors';

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ["health", "workout", "work", "study", "payment", "entertainment"],
      showNotice: false,
    };
  }

  toggleNotice = () => {
    this.setState({showNotice: !this.state.showNotice});
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.Background }}>
        <Header title="CATEGORIES" />
        <Button.Menu onPress={() => this.props.navigation.toggleDrawer()} />
        <FlatList 
          data={this.state.categories}
          keyExtractor={(item, index) => item + index}
          renderItem={obj => (
            <View style={{ alignItems: "center", justifyContent: "center", padding: 10, }}>
              <Category name={obj.item} size={100} />
              <Text style={{ color: "dimgrey" }} >
                {obj.item.charAt(0).toUpperCase() + obj.item.slice(1)}
              </Text>
            </View>
          )}
          numColumns={3}
        />
        <Button.Notice onPress={this.toggleNotice} />
        <Overlay 
          isVisible={this.state.showNotice} 
          onBackdropPress={this.toggleNotice}
          overlayStyle={{ 
            borderRadius: 10,
          }}
        >
          <NoticeBox upcomingList={[]} />
        </Overlay>
      </View>
    );
  }
};
