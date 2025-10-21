import { ActivityIndicator, View, Image } from "react-native";
import React from "react";
import LogoImage from '../../../assets/icons/vyoma-icon.png';

const LoadingScreen = () => {
  return (
    <View
      style={{ height: "100%", backgroundColor: "white" }}
      className="flex items-center justify-center"
    >
      <Image source={LogoImage} style={{ width: 150, height: 150 }} />

    </View>
  );
};

export default LoadingScreen;
