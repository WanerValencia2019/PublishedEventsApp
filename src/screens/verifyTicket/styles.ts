import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { fonts, headers, paragraphs } from "../../constants/Texts";

const { width } =Dimensions.get("screen");

export default StyleSheet.create({
    root: {
        
    },
    title: {
        fontFamily: fonts.Roboto_500Medium,
        fontSize: headers.h4,
        marginBottom: 15
    },
    inputContainer: {
        width:  width*0.8
    },
    buttonContainer: {
        marginLeft: 10, 
        marginRight: 10
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
        borderRadius: 10,
        borderColor: Colors.darkBlue,
        borderWidth: 1,
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