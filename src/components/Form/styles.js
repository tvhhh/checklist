import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  taskFormLayout: {
    flex: 1,
    backgroundColor: colors.Background,
  },
  titleInput: {
    fontSize: 24,
    borderColor: "grey",
    borderBottomWidth: 1,
  },
  descriptionInput: {
    fontSize: 16,
    borderColor: "grey",
    borderBottomWidth: 1,
  },
  datetimePicker: {
    padding: 5,
    marginRight: 10,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
  },
});
