import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  searchLayout: {
    flex: 1,
    backgroundColor: colors.Background,
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
  itemFormat: {
    marginRight:10,
    marginLeft:10,
    marginTop:10,
    paddingTop:8,
    paddingBottom:8,
    backgroundColor: 'white',
    borderRadius:16,
    borderWidth: 8,
    borderColor: colors.Background,
  },
});
