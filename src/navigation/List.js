import React from 'react';
import { Text, View, } from 'react-native';
import { Overlay } from 'react-native-elements';
import TaskForm from '../components/Form/TaskForm';
import SearchForm from '../components/Form/SearchForm';
import Header from '../components/Header/index';
import TaskList from '../components/TaskList/index';
import NoticeBox from '../components/Notification/index';
import Button from '../components/Button/index';
import colors from '../styles/colors';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      showForm: false,
      showSearch: false,
      showNotice: false,
    };
  }

  addTask = newTask => {
    this.setState({showForm: false, list: [...this.state.list, newTask]});
  }

  toggleForm = () => {
    this.setState({showForm: !this.state.showForm});
  }

  toggleSearch = () => {
    this.setState({showSearch: !this.state.showSearch});
  }

  toggleNotice = () => {
    this.setState({showNotice: !this.state.showNotice});
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Header title={this.props.title} />
        <Button.Menu onPress={() => this.props.navigation.toggleDrawer()} />
        <Button.Search onPress={this.toggleSearch} />
        <Overlay 
          isVisible={this.state.showSearch}  
          onBackdropPress={this.toggleSearch}
          fullScreen={true}
          overlayStyle={{ padding: 0, }}
        >
          <SearchForm />
        </Overlay>
        <TaskList taskList={this.state.list} />
        <Button.Notice onPress={this.toggleNotice} />
        <Overlay 
          isVisible={this.state.showNotice} 
          onBackdropPress={this.toggleNotice}
          overlayStyle={{ 
            borderRadius: 10,
          }}
        >
          <NoticeBox upcomingList={this.state.list} />
        </Overlay>
        <Button.Plus onPress={this.toggleForm} />
        <Overlay 
          isVisible={this.state.showForm} 
          onBackdropPress={this.toggleForm}
          overlayStyle={{ 
            padding: 0,
            height: 280,
            borderRadius: 10,
          }}
        >
          <TaskForm onSubmit={this.addTask} />
        </Overlay>
      </View>
    );
  }
};
