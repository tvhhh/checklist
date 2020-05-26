import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 20,
    left: 10,
  },
  noticeButton: {
    position: "absolute",
    top: 10,
    right: 15,
  },
  plusButton: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "#034698",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  searchButton: {
    alignSelf: "flex-end",
    marginRight: 5,
  },
});
