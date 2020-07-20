import React from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckButton from '../CheckBox';
import Header from '../Header';
import {connect} from 'react-redux';
import {extractDate, isToday, extractDateTime} from '../../utils/DateTime';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMNote: true,
      showTNote: true,
    };
  }
  onPressM = () => {
    if (this.state.showMNote === true) {
      this.setState({showMNote: false});
    } else {
      this.setState({showMNote: true});
    }
  };
  onPressT = () => {
    if (this.state.showTNote === true) {
      this.setState({showTNote: false});
    } else {
      this.setState({showTNote: true});
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Header title={'NOTIFICATION'} />
        <View style={styles.container}>
          <TouchableOpacity onPress={this.onPressM}>
            <Text style={styles.myNoteContainer}>
              {this.state.showMNote ? <AntDesign name="down" /> : null}
              {!this.state.showMNote ? <AntDesign name="right" /> : null}
              <Text> </Text>
              My note
            </Text>
          </TouchableOpacity>
          {this.state.showMNote ? (
            <FlatList
              data={this.props.taskList
                .filter(item => {
                  return isToday(item.dueTime);
                })
                .sort((a, b) =>
                  extractDateTime(a.dueTime).time.localeCompare(
                    extractDateTime(b.dueTime).time,
                  ),
                )}
              renderItem={({item}) => (
                <View style={styles.item}>
                  <CheckButton
                    name="done"
                    checked={this.props.done}
                    onPress={this.props.toggleDone}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title} </Text>
                    <Text style={styles.description}>
                      | {extractDate(item.dueTime)}{' '}
                      {extractDateTime(item.dueTime).time}{' '}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : null}
          <TouchableOpacity onPress={this.onPressT}>
            <Text style={styles.myTNoteContainer}>
              {this.state.showTNote ? <AntDesign name="down" /> : null}
              {!this.state.showTNote ? <AntDesign name="right" /> : null}
              <Text> </Text>
              My team's note
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 0,
    paddingBottom: 5,
    margin: 20,
    marginBottom: 10,
    borderRadius: 30,
    backgroundColor: '#c9f1fd',
    fontSize: 13,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
  },
  textContainer: {
    flex: 1,
  },
  CheckButton: {
    paddingLeft: 5,
  },
  myNoteContainer: {
    borderRadius: 10,
    marginLeft: 10,
    fontSize: 15,
    width: 100,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#d3e2fb',
  },
  myTNoteContainer: {
    borderRadius: 10,
    marginLeft: 10,
    fontSize: 15,
    width: 150,
    marginTop: 20,
    marginBottom: 50,
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

const mapStateToProps = state => ({
  taskList: state.userData.data.tasks,
});

export default connect(mapStateToProps)(Notification);
