import React from 'react';
import { Text, View, } from 'react-native';
import { Overlay } from 'react-native-elements';
import TaskForm from '../components/Form/TaskForm';
import SearchForm from '../components/Form/SearchForm';
import Header from '../components/Header/index';
import TaskList from '../components/TaskList/index';
import Button from '../components/Button/index';
import colors from '../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      showForm: false,
      showSearch: false,
    };
  }

  addTask = newTask => {
    this.setState({list: [...this.state.list, newTask]});
  }

  toggleForm = () => {
    this.setState({showForm: !this.state.showForm});
  }

  toggleSearch = () => {
    this.setState({showSearch: !this.state.showSearch});
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Header title={this.props.title} />
        <Button.Search onPress={this.toggleSearch} />
        {(this.state.list.length > 0) ?
          <TaskList title="TODAY" taskList={this.state.list} /> :
          (<View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
            <Text style={{ color: "dimgrey", fontFamily: "notoserif", fontSize: 28 }}>What are you gonna do?</Text>
            <Text style={{ color: "dimgrey", fontFamily: "notoserif", fontSize: 20 }}>Tap + to create a new task</Text>
            <FontAwesome5 name="tasks" color="grey" size={50} />
          </View>)
        }
        <Overlay 
          isVisible={this.state.showSearch}  
          onBackdropPress={this.toggleSearch}
          fullScreen={true}
          overlayStyle={{ padding: 0, }}
        >
          <SearchForm />
        </Overlay>
        <Overlay 
          isVisible={this.state.showForm} 
          onBackdropPress={this.toggleForm}
          overlayStyle={{ 
            padding: 0,
            height: 280,
            borderRadius: 10,
          }}
        >
          <TaskForm onBack={this.toggleForm} onSubmit={this.addTask} />
        </Overlay>
        <Button.Menu onPress={() => this.props.navigation.toggleDrawer()} />
        <Button.Notice />
        <Button.Plus onPress={this.toggleForm} />
      </View>
    );
  } 
};
