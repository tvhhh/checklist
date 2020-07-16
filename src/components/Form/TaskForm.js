import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput,TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Overlay } from 'react-native-elements';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CategoryPicker from './CategoryPicker';
import Category from '../Category';
import ConfirmationBox from './ConfirmationBox';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import colors from '../../styles/colors';

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
        dueTime: this.props.dueTime || today,
        category: this.props.category || "uncategorized",
        pinned: this.props.pinned || false,
        done: this.props.done || false,
      },
      errorText: false,
      errorTime: false,
    }
  }

  updateTitle = text => {
    this.setState({ task: {...(this.state.task), title: text}, errorText: false });
  }

  updateDescription = text => {
    this.setState({ task: {...(this.state.task), description: text} });
  }

  toggleDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible, errorTime: false });
  }

  handleDateTimeConfirm = time => {
    time.setSeconds(0, 0);
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
    let now = getToday();
    if (this.state.task.title.trim() === "") {
      this.setState({ errorText: true });
    } else if (this.state.task.dueTime < now) {
      this.setState({ errorTime: true });
    } else {
      this.props.onSubmit(this.state.task);
    }
  }

  render() {
    const extractedDateTime = extractDateTime(this.state.task.dueTime);

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.taskFormLayout} >
          <View style={styles.taskFormHeader}>
            <TouchableOpacity style={styles.saveButtonContainer} onPress={this.handleSubmit} >
              <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.taskFormInputField}>
            <TextInput style={styles.titleInput}
              underlineColorAndroid="transparent"
              placeholder="I'm gonna do..."
              placeholderTextColor={colors.PrimaryText}
              onChangeText={this.updateTitle}
              defaultValue={this.state.task.title}
              autoCapitalize="none"
            />
            {this.state.errorText ? 
              <Text style={styles.errorText}>
                This field is required.
              </Text> : null
            }
            <TextInput style={styles.descriptionInput}
              underlineColorAndroid="transparent"
              placeholder="DESCRIPTION"
              placeholderTextColor={colors.SecondaryText}
              onChangeText={this.updateDescription}
              defaultValue={this.state.task.description}
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.datetimePicker} onPress={this.toggleDateTimePicker}>
              <Text style={styles.dateTimePickerText}>{`${extractedDateTime.date}  ${extractedDateTime.time}`}</Text>
            </TouchableOpacity>
            {this.state.errorTime ? 
              <Text style={styles.errorText}>
                Sorry, your due time should be later than now.
              </Text> : null
            }
            <View style={styles.categoryPickerButton}>
              {(this.state.task.category === "uncategorized") ? 
                (<TouchableOpacity onPress={this.toggleCategoryPicker} >
                  <AntDesign name="questioncircleo" size={59} color="grey" />
                </TouchableOpacity>) :
                <Category name={this.state.task.category} onPress={this.toggleCategoryPicker} />
              }
              <Text style={styles.categoryName}>{this.state.task.category.toUpperCase()}</Text>
            </View>
            {this.props.isOnSelected ?
              <View style={styles.taskFormFooter}>
                <TouchableOpacity style={styles.removeButton} onPress={this.toggleConfirmationBox} >
                  <FontAwesome name="trash-o" size={30} color="midnightblue" />
                </TouchableOpacity>
              </View> : null
            }
          </View>
          <DateTimePickerModal
            isVisible={this.state.isDateTimePickerVisible}
            mode="datetime"
            onConfirm={this.handleDateTimeConfirm}
            onCancel={this.toggleDateTimePicker}
          />
          <Overlay
            isVisible={this.state.isCategoryPickerVisible}
            onBackdropPress={this.toggleCategoryPicker}
            overlayStyle={styles.categoryPickerForm}
          >
            <CategoryPicker onBack={this.toggleCategoryPicker} onSubmit={this.updateCategory} />
          </Overlay>
          <Overlay
            isVisible={this.state.isConfirmationBoxVisible}
            onBackdropPress={this.toggleConfirmationBox}
            overlayStyle={styles.confirmationBox}
          >
            <ConfirmationBox onCancel={this.toggleConfirmationBox} onConfirm={this.handleRemoveConfirm} />
          </Overlay>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  taskFormLayout: {
    flex: 1,
  },
  taskFormHeader: {
    flexDirection: "row-reverse",
    paddingHorizontal: 15,
  },
  saveButtonContainer: {
    padding: 5,
  },
  saveButtonText: {
    color: colors.PrimaryColor,
    fontSize: 20,
  },
  taskFormInputField: {
    flex: 1,
    paddingHorizontal: 10,
  },
  titleInput: {
    fontSize: 18,
    borderColor: colors.Border,
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  descriptionInput: {
    fontSize: 14,
    borderColor: colors.Border,
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  datetimePicker: {
    padding: 5,
    marginTop: 10,
    marginRight: 10,
    borderColor: colors.Border,
    borderWidth: 1,
    borderRadius: 5,
  },
  dateTimePickerText: {
    fontSize: 16,
  },
  categoryPickerButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  categoryPickerForm: { 
    padding: 0,
    height: 280,
    width: 300,
    borderRadius: 5,
  },
  categoryName: {
    color: colors.PrimaryText,
  },
  taskFormFooter: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  removeButton: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "midnightblue",
    borderWidth: 1,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  confirmationBox: {
    height: 150,
    width: 300,
    borderRadius: 5,
  },
  errorText: {
    color: colors.ErrorText,
    fontSize: 12,
  },
});
