import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  listTitle: {
    color: "dimgrey",
    fontFamily: "Roborto",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  task: {
    flex: 1,
    backgroundColor: "white",
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    marginBottom: 5,
    borderRadius: 15,
  },
  taskContent: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 15,
  },
  taskTitle: {
    fontFamily: "serif",
    fontSize: 16,
    opacity: 0.87,
  },
  taskTime: {
    color: "dimgrey",
    fontFamily: "Roboto",
    fontSize: 12,
    opacity: 0.87,
  },
});
