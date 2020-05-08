import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  listTitle: {
    color: "dimgrey",
    fontFamily: "Roborto",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  task: {
    flex: 1,
    backgroundColor: colors.Water,
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    marginBottom: 5,
    borderRadius: 20,
  },
  taskContent: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 15,
  },
  taskTitle: {
    fontFamily: "serif",
    fontSize: 20,
    opacity: 0.87,
  },
  taskTime: {
    color: "dimgrey",
    fontFamily: "Roboto",
    fontSize: 15,
    opacity: 0.87,
  },
});
