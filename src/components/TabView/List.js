import React from 'react';
import { View, } from 'react-native';
import { Overlay } from 'react-native-elements';
import TaskForm from '../Form/TaskForm';
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

  handleRemoval = () => {
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

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <Header title={this.props.title} />
        <Button.Menu onPress={this.toggleDrawer} />
        <Button.Search onPress={() => this.props.navigation.navigate("Search")} />
        <Button.Notice onPress={() => this.props.navigation.navigate("Notice")} />
        <TaskList title={this.props.title} taskList={this.props.taskList} onTaskSelect={this.onTaskSelect} />
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
