import React from 'react';
import { Keyboard, Text, TextInput,TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { getToDay, extractDate, extractTime } from '../../util/DateTime';

class DateTimePicker extends React.Component {
  render() {
    return(
      <DateTimePickerModal 
        isVisible={this.props.isVisible}
        mode={this.props.mode}
        onConfirm={this.props.onConfirm}
        onCancel={this.props.onCancel}
      />
    );
  }
};

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      title: this.props.title,
      description: this.props.description,
      pickedDate: this.props.pickedDate,
      pickedTime: this.props.pickedTime,
      category: this.props.category || "UNCATEGORIZED",
    }
  }

  componentDidMount = () => {
    let today = getToDay();
    this.setState({ pickedDate: today.date });
    this.setState({ pickedTime: today.time });
  }

  updateTitle = text => {
    this.setState({title: text});
  }

  updateDescription = text => {
    this.setState({description: text});
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  }

  showTimePicker = () => {
    this.setState({ isTimePickerVisible: true });
  }

  handleDateConfirm = date => {
    this.setState({ isDatePickerVisible: false });
    this.setState({ pickedDate: extractDate(date) });
  }

  handleTimeConfirm = time => {
    this.setState({ isTimePickerVisible: false });
    this.setState({ pickedTime: extractTime(time) });
  }

  hideDateTimePicker = () => {
    this.setState({ isDatePickerVisible: false, isTimePickerVisible: false });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state);
    this.props.onBack();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.taskFormLayout} >
          <View style={{ flexDirection: "row", padding: 10 }}>
            <MaterialIcons name="arrow-back" size={30} color="grey" onPress={this.props.onBack} />
            <TouchableOpacity style={{ position: "absolute", top: 10, right: 25 }} onPress={this.handleSubmit} >
              <Text style={{ color: "dodgerblue", fontSize: 24 }}>SAVE</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <TextInput style={styles.titleInput}
              underlineColorAndroid="transparent"
              placeholder="TITLE"
              placeholderTextColor="dimgrey"
              onChangeText={this.updateTitle}
              autoCapitalize="none"
            />
            <TextInput style={styles.descriptionInput}
              underlineColorAndroid="transparent"
              placeholder="DESCRIPTION"
              placeholderTextColor="grey"
              onChangeText={this.updateDescription}
              autoCapitalize="none"
              multiline={true}
            />
            <View style={{ flexDirection: "row", paddingTop: 20, }}>
              <TouchableOpacity style={styles.datetimePicker} onPress={this.showDatePicker}>
                <Text style={{ fontSize: 16 }}>{this.state.pickedDate}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.datetimePicker} onPress={this.showTimePicker}>
                <Text style={{ fontSize: 16 }}>{this.state.pickedTime}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20, borderColor: "grey", borderRadius: 5, borderWidth: 1, }}>
              <Picker
                selectedValue={this.state.category}
                onValueChange={(itemValue) => this.setState({category: itemValue})}
                mode="dropdown"
              >
                <Picker.Item label="UNCATEGORIZED" value="unknown" />
                <Picker.Item label="HEALTH" value="health" />
                <Picker.Item label="WORKOUT" value="workout" />
                <Picker.Item label="WORK" value="work" />
                <Picker.Item label="STUDY" value="study" />
                <Picker.Item label="PAYMENT" value="payment" />
                <Picker.Item label="ENTERTAINMENT" value="entertainment" />
              </Picker>
            </View>
          </View>       
          <DateTimePicker 
            isVisible={this.state.isDatePickerVisible}
            mode="date"
            onConfirm={this.handleDateConfirm}
            onCancel={this.hideDateTimePicker}
          />
          <DateTimePicker 
            isVisible={this.state.isTimePickerVisible}
            mode="time"
            onConfirm={this.handleTimeConfirm}
            onCancel={this.hideDateTimePicker}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
};
