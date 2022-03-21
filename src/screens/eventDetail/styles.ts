import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { fonts, headers, paragraphs } from "../../constants/Texts";

const { width, height } = Dimensions.get("screen")

export default StyleSheet.create({
  root: {
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.9)",
    opacity: 0.3,

  },
  title: {
      fontFamily: fonts.Roboto_400Regular,
      fontWeight: "400",
      fontSize: headers.h2,
      paddingLeft: 20,
      color: Colors.darkBlueText
  },
  wrapperDates: {
    paddingLeft: 0
  },
  wrapperDescription: {
    paddingLeft: 20,
    paddingTop: 10
  },
  sectionTitle: {
    fontFamily: fonts.Roboto_500Medium,
    fontWeight: "500",
    fontSize: headers.h5,
    color: Colors.darkBlue
  },
  description: {
      fontFamily: fonts.Roboto_300Light,
      fontWeight: "300",
      fontSize: paragraphs.pLarge,
      color: Colors.darkBlueText
  },
  dateText: {
    fontFamily: fonts.Roboto_300Light,
    fontWeight: "300",
    fontSize: paragraphs.pLarge,
    color: Colors.darkBlueText
  },
  timeText: {
    fontFamily: fonts.Roboto_300Light,
    fontWeight: "300",
    fontSize: paragraphs.pLarge,
    color: Colors.darkGray
  }
});