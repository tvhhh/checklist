import React from 'react';
import { Text, TextInput,TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var getToDay = () => {
  let today = new Date();
  let day = DAYS[today.getDay()];
  let date = today.getDate();
  let month = MONTHS[today.getMonth()];
  let year = today.getFullYear();
  let hour = String(today.getHours()).padStart(2, '0');
  let minute = String(today.getMinutes()).padStart(2, '0');
  return {
    date: `${day}, ${month} ${date}, ${year}`,
    time: `${hour}:${minute}`,
  }
}

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
    let today = getToDay();
    this.state = {
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      title: "",
      description: "",
      pickedDate: today.date,
      pickedTime: today.time,
      category: "UNCATEGORIZED",
    }
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  }

  showTimePicker = () => {
    this.setState({ isTimePickerVisible: true });
  }

  handleDateConfirm = (date) => {
    this.setState({ isDatePickerVisible: false });
    let ddd = DAYS[date.getDay()];
    let dd = date.getDate();
    let mmm = MONTHS[date.getMonth()];
    let yyyy = date.getFullYear();
    let pickedDate = `${ddd}, ${mmm} ${dd}, ${yyyy}`;
    this.setState({ pickedDate: pickedDate });
  }

  handleTimeConfirm = (time) => {
    this.setState({ isTimePickerVisible: false });
    let hh = String(time.getHours()).padStart(2, '0');
    let mm = String(time.getMinutes()).padStart(2, '0');
    let pickedTime = `${hh}:${mm}`;
    this.setState({ pickedTime: pickedTime });
  }

  hideDateTimePicker = () => {
    this.setState({ isDatePickerVisible: false, isTimePickerVisible: false });
  }

  render() {
    return (
      <View style={styles.taskFormLayout}>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <MaterialIcons name="arrow-back" size={30} color="grey" onPress={() => this.props.navigation.goBack()} />
          <TouchableOpacity style={{ position: "absolute", top: 10, right: 25 }}>
            <Text style={{ color: "dodgerblue", fontSize: 24 }}>SAVE</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <TextInput style={styles.titleInput}
            underlineColorAndroid = "transparent"
            placeholder = "TITLE"
            placeholderTextColor = "dimgrey"
            autoCapitalize = "none"
          />
          <TextInput style={styles.descriptionInput}
            underlineColorAndroid = "transparent"
            placeholder = "DESCRIPTION"
            placeholderTextColor = "grey"
            autoCapitalize = "none"
            multiline = {true}
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
    );
  }
}
