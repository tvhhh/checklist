import React from 'react';
import { View, } from 'react-native';
import { Overlay } from 'react-native-elements';
import TaskForm from '../Form/TaskForm';
import SearchForm from '../Form/SearchForm';
import Header from '../Header/index';
import TaskList from '../TaskList/index';
import Button from '../Button/index';
import colors from '../../styles/colors';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showSearch: false,
      showNotice: false,
      selected: {},
    };
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  handleSubmit = task => {
    this.setState({ showForm: false });
    if (Object.keys(this.state.selected).length) {
      this.props.onEditTask(task, this.state.selected);
    } else {
      this.props.onCreateTask(task);
      this.setState({ selected: {} });
    }
  }

  handleRemoval = selected => {
    this.props.onRemoveTask(this.state.selected);
    this.setState({ showForm: false, selected: {} });
  }

  onTaskSelect = task => {
    this.setState({ showForm: true, selected: task });
  }

  onFormBackdropPress = () => {
    this.setState({ showForm: false, selected: {} });
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  }

  toggleSearch = () => {
    this.setState({ showSearch: !this.state.showSearch });
  }

  toggleNotice = () => {
    this.setState({ showNotice: !this.state.showNotice });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Header title={this.props.title} />
        <Button.Menu onPress={this.toggleDrawer} />
        <Button.Search style={{ alignSelf: "flex-end", marginRight: 5, }} onPress={this.toggleSearch} />
        <Overlay 
          isVisible={this.state.showSearch}  
          onBackdropPress={this.toggleSearch}
          fullScreen={true}
          overlayStyle={{ padding: 0, }}
        >
          <SearchForm />
        </Overlay>
        <TaskList title={this.props.title} taskList={this.props.taskList} onTaskSelect={this.onTaskSelect} />
        <Button.Notice onPress={() => this.props.navigation.navigate("Notice")} />
        <Button.Create onPress={this.toggleForm} />
        <Overlay 
          isVisible={this.state.showForm} 
          onBackdropPress={this.onFormBackdropPress}
          overlayStyle={{
            padding: 0,
            height: Object.keys(this.state.selected).length ? 350 : 300,
            borderRadius: 10,
          }}
        >
          <TaskForm
            {...this.state.selected}
            isOnSelected={Object.keys(this.state.selected).length > 0} 
            onSubmit={this.handleSubmit}
            onRemove={this.handleRemoval}
          />
        </Overlay>
      </View>
    );
  }
};
