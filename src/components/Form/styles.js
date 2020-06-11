import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  taskFormLayout: {
    flex: 1,
  },
  titleInput: {
    fontSize: 18,
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
  confirmBoxLayout: {
    flex: 1,
  },
  confirmBoxContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
