import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export const headers = {
  h1: width * 0.12,
  h2: width * 0.10,
  h3: width * 0.08,
  h4: width * 0.06,
  h5: width * 0.045,
};

export const paragraphs = {
  pLarge: width * 0.04,
  pMedium: width * 0.037,
  pSmall: width * 0.032,
};

export const caption = {
  captionOne: width * 0.025,
  captionTwo: width * 0.003,
  captionThree: width * 0.002,
};
export const fonts = {
  Roboto_100Thin: "Roboto_100Thin",
  Roboto_100Thin_Italic: "Roboto_100Thin_Italic",
  Roboto_300Light:"Roboto_300Light",
  Roboto_300Light_Italic:"Roboto_300Light_Italic",
  Roboto_400Regular:"Roboto_400Regular",
  Roboto_400Regular_Italic:"Roboto_400Regular_Italic",
  Roboto_500Medium:"Roboto_500Medium",
  Roboto_500Medium_Italic:"Roboto_500Medium_Italic",
  Roboto_700Bold:"Roboto_700Bold",
  Roboto_700Bold_Italic:"Roboto_700Bold_Italic",
  Roboto_900Black:"Roboto_900Black",
  Roboto_900Black_Italic:"Roboto_900Black_Italic",
};
