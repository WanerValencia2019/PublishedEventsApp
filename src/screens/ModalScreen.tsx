import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { login } from "../redux/auth/actions";

import { API_URL } from "@env";

export default function ModalScreen() {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text
        onPress={() =>
          dispatch(
            login({ email: "valenciawaner@gmail.com", password: "admin" })
          )
        }
        style={styles.title}
      >
        Modal
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/ModalScreen.tsx" />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
