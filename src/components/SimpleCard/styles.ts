import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { fonts, headers, paragraphs } from "../../constants/Texts";

export default StyleSheet.create({
    root: {
        display: "flex",
        flexDirection: "row",
        padding: 10,
        margin: 10,
        borderRadius: 16,
        elevation: 1,
        backgroundColor: "white",
        shadowColor: "#FFF",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: 20,
        paddingTop: 10
    },
    date: {
        color: Colors.blue,
        fontFamily: fonts.Roboto_400Regular,
        fontWeight: "400",
        fontSize: paragraphs.pMedium,
        //textTransform: "capitalize"
    },
    title: {
        marginTop: 5,
        fontSize: headers.h5,
        fontFamily: fonts.Roboto_500Medium,
        color: Colors.darkBlue,
        maxWidth: 250
    }
});