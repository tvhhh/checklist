import React from 'react';
import { Keyboard, Text, TextInput,TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CategoryPicker from './CategoryPicker';
import Category from '../Category/index';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import { getToday, extractDateTime } from '../../util/DateTime';

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    let today = getToday();
    this.state = {
      isDateTimePickerVisible: false,
      isCategoryPickerVisible: false,
      task: {
        title: this.props.title,
        description: this.props.description,
        dueTime: this.props.time || today,
        category: this.props.category || "uncategorized",
      },
    }
  }

  updateTitle = text => {
    this.setState({ task: {...(this.state.task), title: text} });
  }

  updateDescription = text => {
    this.setState({ task: {...(this.state.task), description: text} });
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  }

  handleDateTimeConfirm = time => {
    this.setState({ task: {...(this.state.task), dueTime: time} });
    this.setState({ isDateTimePickerVisible: false });
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  }

  toggleCategoryPicker = () => {
    this.setState({ isCategoryPickerVisible: !this.state.isCategoryPickerVisible });
  }

  updateCategory = category => {
    this.setState({ task: {...(this.state.task), category: category} });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.task);
  }

  render() {
    let extractedDateTime = extractDateTime(this.state.task.dueTime);
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.taskFormLayout} >
          <TouchableOpacity style={{ position: "absolute", top: 10, right: 25 }} onPress={this.handleSubmit} >
            <Text style={{ color: "dodgerblue", fontSize: 20 }}>SAVE</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, padding: 10, marginTop: 20, }}>
            <TextInput style={styles.titleInput}
              underlineColorAndroid="transparent"
              placeholder="I'm gonna do..."
              placeholderTextColor="dimgrey"
              onChangeText={this.updateTitle}
              defaultValue={this.state.task.title}
              autoCapitalize="none"
            />
            <TextInput style={styles.descriptionInput}
              underlineColorAndroid="transparent"
              placeholder="DESCRIPTION"
              placeholderTextColor="grey"
              onChangeText={this.updateDescription}
              defaultValue={this.state.task.description}
              autoCapitalize="none"
            />
            <View style={{ flexDirection: "row", paddingTop: 20, }}>
              <TouchableOpacity style={styles.datetimePicker} onPress={this.showDateTimePicker}>
                <Text style={{ fontSize: 16 }}>{`${extractedDateTime.date}  ${extractedDateTime.time}`}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center", padding: 12, }}>
              {(this.state.task.category === "uncategorized") ? 
                (<TouchableOpacity onPress={this.toggleCategoryPicker} >
                  <AntDesign name="questioncircleo" size={55} color="grey" />
                </TouchableOpacity>) :
                <Category name={this.state.task.category} onPress={this.toggleCategoryPicker} />
              }
              <Text style={{ color: "dimgrey" }}>{this.state.task.category.toUpperCase()}</Text>
            </View>
          </View>
          <Overlay
            isVisible={this.state.isCategoryPickerVisible}
            onBackdropPress={this.toggleCategoryPicker}
            overlayStyle={{ 
              padding: 0,
              height: 280,
              width: 300,
              borderRadius: 5,
            }}
          >
            <CategoryPicker onBack={this.toggleCategoryPicker} onSubmit={this.updateCategory} />
          </Overlay>       
          <DateTimePickerModal
            isVisible={this.state.isDateTimePickerVisible}
            mode="datetime"
            onConfirm={this.handleDateTimeConfirm}
            onCancel={this.hideDateTimePicker}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
};
