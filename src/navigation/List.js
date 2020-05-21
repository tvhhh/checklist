import React from 'react';
import { Text, View, } from 'react-native';
import TaskForm from '../components/Form/TaskForm';
import Search from '../components/SearchBox/Search';
import Header from '../components/Header/index';
import TaskList from '../components/TaskList/index';
import SearchBox from '../components/SearchBox/index';
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
    if (this.state.showForm) return (<TaskForm onBack={this.toggleForm} onSubmit={this.addTask} />);
    if (this.state.showSearch) return (<Search onBack={this.toggleSearch} />)
    return (
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Header title={this.props.title} />
        <SearchBox onPress={this.toggleSearch} />
        {(this.state.list.length > 0) ?
          <TaskList title="TODAY" taskList={this.state.list} /> :
          (<View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
            <Text style={{ color: "dimgrey", fontFamily: "notoserif", fontSize: 28 }}>What are you gonna do?</Text>
            <Text style={{ color: "dimgrey", fontFamily: "notoserif", fontSize: 20 }}>Tap + to create a new task</Text>
            <FontAwesome5
              name="tasks"
              color="grey"
              size={50}
            />
          </View>)
        }
        <Button.Menu onPress={() => this.props.navigation.toggleDrawer()} />
        <Button.Notice />
        <Button.Plus onPress={this.toggleForm} />
      </View>
    );
  } 
};
