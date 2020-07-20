import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CategoryPicker from './CategoryPicker';
import Category from '../Category';
import ConfirmationBox from './ConfirmationBox';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import colors, { lightTheme, darkTheme } from '../../styles/colors';
import { smallFonts, mediumFonts, largeFonts } from '../../styles/fonts';

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
    this.setState({ task: {...(this.state.task), dueTime: time}, isDateTimePickerVisible: false });
  }

  toggleCategoryPicker = () => {
    this.setState({ isCategoryPickerVisible: !this.state.isCategoryPickerVisible });
  }

  updateCategory = category => {
    this.setState({ task: {...(this.state.task), category: category}, isCategoryPickerVisible: false });
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
    const theme = this.props.customize.darkTheme ? darkTheme : lightTheme;
    const fonts = mediumFonts;
    const font = this.props.customize.font;
    
    const extractedDateTime = extractDateTime(this.state.task.dueTime);
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: theme.Overlay }}>
          <View style={styles.taskFormHeader}>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.handleSubmit}>
              <Text style={[styles.saveButtonText, {fontSize: fonts.ButtonText, fontFamily: font}]}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.onBack}>
              <Text style={[styles.cancelButtonText, {fontSize: fonts.ButtonText, fontFamily: font}]}>CANCEL</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.taskFormInputField}>
            <TextInput style={[styles.titleInput, {fontSize: fonts.TitleText, fontFamily: font, color: theme.TitleText}]}
              underlineColorAndroid="transparent"
              placeholder="I'm gonna do..."
              placeholderTextColor={theme.PrimaryText}
              onChangeText={this.updateTitle}
              defaultValue={this.state.task.title}
              autoCapitalize="none"
            />
            {this.state.errorText ? 
              <Text style={{ color: colors.Error, fontSize: fonts.ErrorText, fontFamily: font }}>
                This field is required.
              </Text> : null
            }
            <TextInput style={[styles.descriptionInput, {fontSize: fonts.CaptionText, fontFamily: font, color: theme.PrimaryText}]}
              underlineColorAndroid="transparent"
              placeholder="DESCRIPTION"
              placeholderTextColor={theme.SecondaryText}
              onChangeText={this.updateDescription}
              defaultValue={this.state.task.description}
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.datetimePicker} onPress={this.toggleDateTimePicker}>
              <Text style={{color: theme.PrimaryText, fontSize: fonts.PrimaryText, fontFamily: font}}>{`${extractedDateTime.date}  ${extractedDateTime.time}`}</Text>
            </TouchableOpacity>
            {this.state.errorTime ? 
              <Text style={{ color: colors.Error, fontSize: fonts.ErrorText, fontFamily: font }}>
                Sorry, your due time should be later than now.
              </Text> : null
            }
            <View style={styles.categoryPickerButton}>
              <Category name={this.state.task.category} onPress={this.toggleCategoryPicker} />
              <Text style={
                { color: colors[this.state.task.category.charAt(0).toUpperCase() + this.state.task.category.slice(1)] , fontSize: fonts.PrimaryText, fontFamily: font}
              }>
                {this.state.task.category.toUpperCase()}
              </Text>
            </View>
            {this.props.isOnSelected ?
              <View style={styles.taskFormFooter}>
                <TouchableOpacity style={styles.removeButton} onPress={this.toggleConfirmationBox} >
                  <FontAwesome name="trash-o" size={30} color={colors.SecondaryColor} />
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
            <CategoryPicker 
              onSubmit={this.updateCategory} 
              customize={this.props.customize}
            />
          </Overlay>
          <Overlay
            isVisible={this.state.isConfirmationBoxVisible}
            onBackdropPress={this.toggleConfirmationBox}
            overlayStyle={styles.confirmationBox}
          >
            <ConfirmationBox 
              title="Delete this task?" 
              onCancel={this.toggleConfirmationBox} 
              onConfirm={this.handleRemoveConfirm}
              customize={this.props.customize} 
            />
          </Overlay>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  taskFormHeader: {
    flexDirection: "row-reverse",
  },
  buttonContainer: {
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  saveButtonText: {
    color: colors.PrimaryColor,
  },
  cancelButtonText: {
    color: colors.SecondaryColor,
  },
  taskFormInputField: {
    flex: 1,
  },
  titleInput: {
    borderColor: colors.Border,
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  descriptionInput: {
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
  categoryPickerButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  categoryPickerForm: { 
    padding: 0,
    height: 380,
    width: 300,
    borderRadius: 5,
  },
  taskFormFooter: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  removeButton: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.SecondaryColor,
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
});
