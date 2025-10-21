import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Text } from "@/src/components/ThemedText";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const router = useRouter();
  
  return (
    <SafeAreaView className="h-[100%] w-[100%] bg-purple-500 flex flex-col justify-end items-center gap-4 pb-10 px-2">
      <Text className="text-white text-4xl font-bold font-space-mono space-x-3">
        Welcome to Vyoma
      </Text>
      <Text className="text-white text-center text-lg px-3">
        A world of opportunities awaits you. Get your business and jobs related
        all tasks done in one place.
      </Text>
      <Button
        onPress={() => { router.push("/signup");  console.log("hey");}}
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
          <Text
            onPress={() => router.push("/signin")}
            className="text-white font-bold"
          >
            Sign In
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
