import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";


const chipColors = [
    "#F59762",
    "#F0635A",
    "#29D697",
    "#46CDFB"
]

export default StyleSheet.create({
  root: {
    paddingTop: 24,
    backgroundColor: Colors.blue,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  topContent: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    paddingTop: 14,
    justifyContent: "space-between",
  },
  wrapperCategories: {
    marginBottom: -20,
    display: "flex",
    flexDirection: "row",
  },
  chipContainer: {
    width: 106,
    height: 39,
    marginLeft: 6,
    marginRight: 6,
    shadowColor: "#FFFfff08",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 6.68,
    elevation: 22,
  },
  chipButton: {
      backgroundColor: chipColors[Math.floor(Math.random() * (3 - 0)) + 0]
  }
});
