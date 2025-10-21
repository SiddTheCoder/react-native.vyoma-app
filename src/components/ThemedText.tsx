import { Text as RNText, TextProps } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export function Text(props: TextProps) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  return (
    <RNText
      {...props}
      style={[
        { fontFamily: fontsLoaded ? "Poppins_400Regular" : undefined },
        props.style,
      ]}
    />
  );
}
