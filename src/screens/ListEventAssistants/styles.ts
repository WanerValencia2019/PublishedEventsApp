import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { fonts, headers, paragraphs } from "../../constants/Texts";

export default StyleSheet.create({
    root: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    notExist:{
        fontFamily: fonts.Roboto_500Medium,
        fontSize: headers.h3,
        color: Colors.darkBlue
    },
    userCard: {
        backgroundColor: "white",
        padding: 10,
        marginTop: 10,
        elevation: 1,
        shadowColor: "#fff",
        shadowOffset: {
          width: 18,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 1,
        borderRadius: 10
    },
    fullName: {
        fontFamily: fonts.Roboto_400Regular,
        fontSize: paragraphs.pMedium
    },
    allText: {
        fontFamily: fonts.Roboto_300Light,
        fontSize: paragraphs.pSmall
    }

})