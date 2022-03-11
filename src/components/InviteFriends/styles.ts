import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { fonts, headers, paragraphs } from "../../constants/Texts";

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  root: {
    height: height * 0.22,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    backgroundColor: Colors.darkBlueText,
  },
  wrapperContent: {
    width: "50%",
    marginLeft: width * 0.05,
  },
  title: {
    fontFamily: fonts.Roboto_500Medium,
    fontWeight: "500",
    fontSize: headers.h5,
    color: Colors.light.background,
  },
  textReward: {
    fontFamily: fonts.Roboto_400Regular,
    fontWeight: "400",
    fontSize: paragraphs.pSmall,
    color: Colors.light.background,
    marginTop: 6,
  },
  buttonContainer: {
    marginTop: 7,
  },
  button: {
    backgroundColor: Colors.darkBlue,
    width: "60%",
  },
});
