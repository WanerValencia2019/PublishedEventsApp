import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { fonts, headers, paragraphs } from "../../constants/Texts";

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
    notLogin: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        marginTop: 24,
        //justifyContent: "space-between",
        flexDirection: "column",
        //alignItems: "center",
        backgroundColor: Colors.light.background,
        height,

    },
    wrapperHeader: {
        marginTop: 24,
        marginRight: width * 0.03,
        alignSelf: "flex-end"
    },
    wrapperInfoSection: { 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    nameText: {
        textAlign: "center",
        fontFamily: fonts.Roboto_500Medium,
        fontWeight:"400",
        fontSize: paragraphs.pLarge,
        lineHeight: 31
    },
    wrapperButtonEditProfile: {
        marginTop: height*0.02,
    },
    descriptionTitle: {
        fontFamily: fonts.Roboto_500Medium,
        fontWeight:"400",
        marginLeft: width*0.03,
        marginBottom: height*0.01,
        fontSize: paragraphs.pLarge,
    },
    createdEventsTitle: {
        fontFamily: fonts.Roboto_500Medium,
        fontWeight:"400",
        marginLeft: width*0.03,
        fontSize: paragraphs.pLarge,
    },
    description: {
        fontFamily: fonts.Roboto_300Light,
        fontWeight:"300",
        fontSize: paragraphs.pMedium,
        paddingLeft: width*0.03,
        paddingRight: width*0.03,
        textAlign: "justify"
    },
    wrapperUpcomingEventHeader: {
        width: width,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    wrapperUpcomingEventTitle: {
        fontFamily: fonts.Roboto_500Medium,
        fontWeight: "500",
        fontSize: headers.h5,
        color: Colors.darkBlueText,
        marginLeft: width*0.05
    },
    textSeeAll: {
        fontFamily: fonts.Roboto_400Regular,
        fontWeight: "400",
        fontSize: paragraphs.pSmall,
        color: Colors.darkGray,
        marginRight: width*0.01,
    },
    noEvents: {
        fontFamily: fonts.Roboto_300Light,
        textAlign: "center",
        fontSize: headers.h5,
        paddingLeft: width*0.05,
    }
});