import {Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export default function LandSignupPage({ setCount }: any) {
  return (
    <View className="h-[100%] w-[100%] bg-purple-500 flex flex-col justify-end items-center gap-4 pb-20 px-2">
      <Text className="text-white text-4xl font-bold font-space-mono space-x-3">
        Welcome to Vyoma
      </Text>
      <Text className="text-white text-center text-lg px-3">
        A world of opportunities awaits you. Get your business and jobs related
        all tasks done in one place.
      </Text>
      <Button
        onPress={() => setCount(1)}
        mode={"contained-tonal"}
        textColor="black"
        className="w-[90%] rounded-2xl h-14 text-black font-bold"
        icon={"account-plus"}
        maxFontSizeMultiplier={1}
        style={{
          borderRadius: 16,
          height: 56,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
        labelStyle={{
          fontSize: 17,
          fontWeight: "semibold",
        }}
      >
        Create an account
      </Button>
      <View className="flex flex-row gap-2 text-white">
        <Text className="text-white font-[12px]">
          Already have an account?{" "}
          <Text className="text-white font-bold">Sign In</Text>
        </Text>
      </View>
    </View>
  );
}