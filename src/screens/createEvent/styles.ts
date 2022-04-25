import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import { fonts, headers } from "../../constants/Texts";


const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
    root: {
        display: "flex",
        flex: 1,
        marginTop: 24,
        backgroundColor: "white",
        paddingLeft: width*0.05,
        paddingRight: width*0.05,
        paddingTop: width*0.05,
    },
    newEvent: {
        fontFamily: fonts.Roboto_500Medium,
        fontSize: headers.h4,
        color: Colors.darkBlueText
    }
});