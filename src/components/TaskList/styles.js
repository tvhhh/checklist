import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  listTitle: {
    color: "dimgrey",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
  },
  task: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    marginBottom: 5,
    borderRadius: 15,
  },
  emptyComponentContainer: {
    alignItems: "center",
    justifyContent: "center", 
    paddingVertical: 200,
  },
});
