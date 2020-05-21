import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  taskFormLayout: {
    flex: 1,
  },
  titleInput: {
    fontSize: 20,
    borderColor: "grey",
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  descriptionInput: {
    fontSize: 14,
    borderColor: "grey",
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  datetimePicker: {
    padding: 5,
    marginRight: 10,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
  },
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  barContainer: {
    flex: 1,
    backgroundColor: colors.Background,
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  inputContainer: {
    backgroundColor: colors.Background,
    borderBottomWidth: 1,
    borderWidth: 1,
  },
});
