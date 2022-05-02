import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { fonts, headers } from "../../constants/Texts";

const { height } = Dimensions.get("screen");

export default StyleSheet.create({
    root: {
        paddingTop: 24,
        backgroundColor: "white",
        //height
    },
    title: {
        fontFamily: fonts.Roboto_500Medium,
        fontWeight:"500",
        fontSize: headers.h4,
        color: Colors.darkBlueText,
        textAlign: "center",
        marginBottom: height * 0.02,
    },

});