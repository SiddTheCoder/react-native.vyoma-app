import { View } from "react-native";
import React from "react";
import { useAppSelector } from "@/src/store/hooks";
import { useFonts, Orbitron_700Bold } from "@expo-google-fonts/orbitron";
import { Text } from "@/src/components/ThemedText";

const Header = () => {
  const [fontsLoaded] = useFonts({
    Orbitron_700Bold,
  });

  return (
    <View>
      <Text
        style={{ fontSize: 26 , fontWeight: "bold", fontFamily: "Orbitron_700Bold" }}
      >
        Vyoma.
      </Text>
    </View>
  );
};

export default Header;
