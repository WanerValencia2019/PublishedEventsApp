import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { fonts, headers, paragraphs } from "../../constants/Texts";

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
    root: {
        display:"flex",
        flex: 1,
        backgroundColor: "white"
    },
    wrapperUpcomingEvents: {
        marginTop: 36,
        display: "flex",
    },
    wrapperUpcomingEventHeader: {
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
    wrapperEventCards: {
        display: "flex",
        flexDirection: "row",
        marginTop: height*0.01,
        paddingLeft: width*0.05,
    }
})