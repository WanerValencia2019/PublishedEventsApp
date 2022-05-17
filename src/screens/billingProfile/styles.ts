import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { fonts, headers, paragraphs } from "../../constants/Texts";

export default StyleSheet.create({
    container: {
        
    },
    wrapperMoneyContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft:10,
        marginRight:10,
        backgroundColor: Colors.blue,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    moneyAvailableTitle: {
        color: Colors.light.background,
        fontSize: headers.h4,
        fontFamily: fonts.Roboto_500Medium_Italic,
    },
    moneyAvailable: {
     color: Colors.light.background,
        fontSize: headers.h3,
        fontFamily: fonts.Roboto_500Medium_Italic,
    },
    moneyWithdrawTitle: {
        color: Colors.light.tabIconDefault,
        fontSize: paragraphs.pMedium,
        fontFamily: fonts.Roboto_500Medium_Italic,

    },
    moneyWithdraw: {
        color: Colors.light.tabIconDefault,
        fontSize: paragraphs.pMedium,
        fontFamily: fonts.Roboto_500Medium_Italic,
    },
    historyTitle: {
        fontFamily: fonts.Roboto_400Regular,
        fontSize: headers.h5,
        marginTop: 10
    },
    historyContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    } 

})