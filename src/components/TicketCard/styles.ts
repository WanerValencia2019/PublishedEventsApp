import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { fonts, headers, paragraphs } from "../../constants/Texts";

const { width, height } = Dimensions.get("screen");
export default StyleSheet.create({
    cardContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 18,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 4,
        backgroundColor: "white",
    },
    name: {
        fontFamily: fonts.Roboto_500Medium,
        fontSize: headers.h5,
        color: Colors.darkBlue,
    },
    description: {
        fontFamily: fonts.Roboto_400Regular,
        fontSize: paragraphs.pSmall,
        color: Colors.darkBlue,
        marginTop: height*0.003,
    },
    price: {
        fontFamily: fonts.Roboto_500Medium,
        fontSize: paragraphs.pMedium,
        color: Colors.darkBlueText,
        marginTop: height*0.008,
    },
    freePrice: {
        fontFamily: fonts.Roboto_700Bold,
        fontSize: paragraphs.pLarge,
        color: Colors.darkBlueText,
        marginTop: height*0.008,
    }
});