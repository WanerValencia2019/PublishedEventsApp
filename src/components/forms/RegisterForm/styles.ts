import { Dimensions, StyleSheet } from "react-native";
import Colors  from "../../../constants/Colors";
import { fonts, headers, paragraphs } from "../../../constants/Texts";

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
    root: {
        display: "flex",
        flex: 1,
        paddingTop: 24,
        backgroundColor: "white"
    },
    imgLogo: {
        width: 200
    },
    wrapperTabs: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: height * 0.02,
        marginBottom: height * 0.02
    },
    tab: {
        fontFamily: fonts.Roboto_500Medium,
        fontWeight: "800",
        fontSize: headers.h5,
        textTransform: "uppercase",
        lineHeight: 18
    },
    tabActive: {
        color: "white",
    },
    tabInactive: {
        color: "#FFFFFF50",
    },
    wrapperSections: {
        marginTop: height * 0.04,
      
        backgroundColor: Colors.blue,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
    },
    wrapperForms: {
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        backgroundColor: "white",
       
    },
    containerRegisterForm: {
        paddingLeft: width * 0.065,
        paddingRight: width * 0.065,
        marginBottom: 50
    },
    containerLogo: {
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: height * 0.04
    },
    inputLabel: {
        fontSize: paragraphs.pMedium,
        marginTop: height * 0.03,
        fontFamily: fonts.Roboto_400Regular,
        fontWeight: "400",
        lineHeight: 20,
        color: Colors.darkBlueText,
    },
    input: {
        fontFamily: fonts.Roboto_500Medium,
        fontWeight: "500",
        lineHeight: 21,
        fontSize: paragraphs.pLarge
    },
    password: {
        marginTop: -25,
    },
    welcomeTitle: {
        fontFamily: fonts.Roboto_500Medium,
        fontWeight: "800",
        fontSize: headers.h4,
        marginLeft: width * 0.08,
        marginTop: width * .04,
        lineHeight: 34,
        color: Colors.darkBlue,
    },
    titleSignin: {
        fontFamily: fonts.Roboto_400Regular,
        fontSize: paragraphs.pMedium,
        marginLeft: width * 0.08,
        fontWeight: "400",
        color: Colors.darkBlueText,
    },
    buttonSignin: {
        backgroundColor: Colors.blue,
        height: 60,
    },
    buttonTitleStyle: {
        fontFamily: fonts.Roboto_500Medium,
        fontWeight: "800",
        fontSize: headers.h5
    },
    containerButton: {
        borderRadius: 12,
        marginLeft: width * 0.02,
        marginRight: width * 0.02,
        backgroundColor: Colors.blue,
    },
    textOtherSignins: {
        fontSize: headers.h5,
        marginTop: height * 0.02,
        textAlign: "center",
        fontFamily: fonts.Roboto_300Light
    },
    forgetPassword: {
        fontFamily: fonts.Roboto_500Medium,
        fontWeight: "500",
        lineHeight: 20,
        color: Colors.blue,
        textAlign: "right",
        marginRight: width * 0.022,
        marginTop: width * 0.015
    },
    containerSocialIcons: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: height * 0.01,
    },
})