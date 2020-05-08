import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  header: {
    backgroundColor: colors.CoolBlack,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingTop: 10,
    paddingBottom: 15,
    marginBottom: 10,
  },
  title: {
    color: "white",
    fontFamily: "sans-serif",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    opacity: 0.87,
  },
  time: {
    color: "white",
    fontFamily: "sans-serif-light",
    fontSize: 15,
    textAlign: "center",
    opacity: 0.66,
  },
});
