import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
    map: {
        width: width,
        height: height
    }
})