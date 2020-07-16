import React from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import screenStyles from './ScreenStyles';
import Header from '../Header';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: props.route.params.taskList,
      show: true,
    };
  }
  onPress = () => {
    if (this.state.show === true) {
      this.setState({show: false});
    } else {
      this.setState({show: true});
    }
  };
  render() {
    return (
      <View style={screenStyles.screenContainer}>
        <Header title={'NOTIFICATION'} />
        <View style={styles.container}>
          <TouchableOpacity onPress={this.onPress}>
            <Text style={styles.cateContainer}>
              My note
              <Text> </Text>
              {this.state.show ? <AntDesign name="down" /> : null}
              {!this.state.show ? <AntDesign name="right" /> : null}
            </Text>
          </TouchableOpacity>
          {this.state.show ? (
            <FlatList
              data={[
                {key: 'Devin', date: '1'},
                {key: 'Dan', date: '1'},
                {key: 'Dominic', date: '1'},
                {key: 'Jackson', date: '1'},
                {key: 'James', date: '1'},
                {key: 'Joel', date: '1'},
                {key: 'John', date: '1'},
                {key: 'Jillian', date: '1'},
                {key: 'Jimmy', date: '1'},
                {key: 'Julie', date: '1'},
                {key: 'Julie', date: '1'},
                {key: 'Julie', date: '1'},
                {key: 'Julie', date: '1'},
                {key: 'Julie', date: '1'},
              ]}
              renderItem={({item}) => (
                <Text style={styles.item}>
                  {item.key} {'\n'}
                  {item.date}
                </Text>
              )}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
    margin: 20,
    marginBottom: 10,
    borderRadius: 30,
    backgroundColor: '#c9f1fd',
    fontSize: 13,
  },
  cateContainer: {
    borderRadius: 10,
    marginLeft: 10,
    fontSize: 15,
    width: 100,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#d3e2fb',
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
