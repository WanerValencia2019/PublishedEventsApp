import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { caption, fonts, headers, paragraphs } from "../../constants/Texts";

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  root: {
    marginLeft: width * 0.02,
    marginRight: width * 0.02,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 18,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 1,
  },
  imageBackground: {
    width: width * 0.6,
    height: height * 0.18,
    borderRadius: 50,
    padding: 5,
  },
  wrapperDate: {
    width: 48,
    height: 48,
    backgroundColor: Colors.light.background,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
  },
  textDay: {
    color: Colors.orange,
    textAlign: "center",
    fontFamily: fonts.Roboto_900Black,
    fontWeight: "900",
    fontSize: paragraphs.pLarge
  },
  textMonth: {
    color: Colors.orange,
    textAlign: "center",
    fontFamily: fonts.Roboto_400Regular,
    fontSize: caption.captionOne
  },
  textTitle: {
      fontFamily: fonts.Roboto_500Medium,
      fontWeight: "400",
      fontSize: paragraphs.pMedium,
      maxWidth: width * 0.56, 
      marginTop: 5,
      color: Colors.darkBlueText
  },
  textAddress: {
    fontFamily: fonts.Roboto_300Light,
    fontWeight: "400",
    color: Colors.darkGray,
    fontSize: caption.captionOne + 2,
    maxWidth: width * 0.55, 
  }
});
