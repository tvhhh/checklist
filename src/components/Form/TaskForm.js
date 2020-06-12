import React from 'react';
import { Keyboard, Text, TextInput,TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CategoryPicker from './CategoryPicker';
import Category from '../Category/index';
import ConfirmationBox from './ConfirmationBox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { getToday, extractDateTime } from '../../utils/DateTime';

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    let today = getToday();
    this.state = {
      isDateTimePickerVisible: false,
      isCategoryPickerVisible: false,
      isConfirmationBoxVisible: false,
      task: {
        title: this.props.title || "",
        description: this.props.description || "",
        dueTime: this.props.time || today,
        category: this.props.category || "uncategorized",
      },
      error: false,
    }
  }

  updateTitle = text => {
    this.setState({ task: {...(this.state.task), title: text}, error: false });
  }

  updateDescription = text => {
    this.setState({ task: {...(this.state.task), description: text} });
  }

  toggleDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible });
  }

  handleDateTimeConfirm = time => {
    this.setState({ task: {...(this.state.task), dueTime: time} });
    this.setState({ isDateTimePickerVisible: false });
  }

  toggleCategoryPicker = () => {
    this.setState({ isCategoryPickerVisible: !this.state.isCategoryPickerVisible });
  }

  updateCategory = category => {
    this.setState({ task: {...(this.state.task), category: category} });
  }

  toggleConfirmationBox = () => {
    this.setState({ isConfirmationBoxVisible: !this.state.isConfirmationBoxVisible })
  }

  handleRemoveConfirm = () => {
    this.setState({ isConfirmationBoxVisible: false });
    this.props.onRemove();
  }

  handleSubmit = () => {
    if (this.state.task.title.trim() === "") {
      this.setState({ error: true });
    } else {
      this.props.onSubmit(this.state.task);
    }
  }

  render() {
    const extractedDateTime = extractDateTime(this.state.task.dueTime);
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.taskFormLayout} >
          <View style={{ flexDirection: "row-reverse", paddingHorizontal: 15 }}>
            <TouchableOpacity style={{ padding: 5, }} onPress={this.handleSubmit} >
              <Text style={{ color: "dodgerblue", fontSize: 20 }}>SAVE</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 10, }}>
            <TextInput style={styles.titleInput}
              underlineColorAndroid="transparent"
              placeholder="I'm gonna do..."
              placeholderTextColor="dimgrey"
              onChangeText={this.updateTitle}
              defaultValue={this.state.task.title}
              autoCapitalize="none"
            />
            {this.state.error ? 
              <Text style={{ color: "red", fontSize: 12 }}>
                This field is required.
              </Text> : null
            }
            <TextInput style={styles.descriptionInput}
              underlineColorAndroid="transparent"
              placeholder="DESCRIPTION"
              placeholderTextColor="grey"
              onChangeText={this.updateDescription}
              defaultValue={this.state.task.description}
              autoCapitalize="none"
            />
            <View style={{ flexDirection: "row", paddingTop: 20, }}>
              <TouchableOpacity style={styles.datetimePicker} onPress={this.toggleDateTimePicker}>
                <Text style={{ fontSize: 16 }}>{`${extractedDateTime.date}  ${extractedDateTime.time}`}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center", padding: 15, }}>
              {(this.state.task.category === "uncategorized") ? 
                (<TouchableOpacity onPress={this.toggleCategoryPicker} >
                  <AntDesign name="questioncircleo" size={59} color="grey" />
                </TouchableOpacity>) :
                <Category name={this.state.task.category} onPress={this.toggleCategoryPicker} />
              }
              <Text style={{ color: "dimgrey" }}>{this.state.task.category.toUpperCase()}</Text>
            </View>
            {this.props.isOnSelected ?
              <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 5, }}>
                <TouchableOpacity 
                  style={{ 
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "midnightblue",
                    borderWidth: 1,
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                  }}
                  onPress={this.toggleConfirmationBox}
                >
                  <FontAwesome name="trash-o" size={30} color="midnightblue" />
                </TouchableOpacity>
              </View> : null
            }
          </View>
          <Overlay
            isVisible={this.state.isConfirmationBoxVisible}
            onBackdropPress={this.toggleConfirmationBox}
            overlayStyle={{
              height: 150,
              width: 300,
              borderRadius: 5,
            }}
          >
            <ConfirmationBox onCancel={this.toggleConfirmationBox} onConfirm={this.handleRemoveConfirm} />
          </Overlay>
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
            onCancel={this.toggleDateTimePicker}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
};
