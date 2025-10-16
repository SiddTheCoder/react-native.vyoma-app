import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import {  FlatList, Text, View } from "react-native";
import { Button } from "react-native-paper";


export default function AuthOptionsPage({ setCount, count }: any) {
  const oAuthOptions = [
    {
      name: "Google",
      icon: "google",
      iconColor: "#4285F4",
      action: () => {},
    },
    {
      name: "Facebook",
      icon: "facebook",
      iconColor: "#1877F2",
      action: () => {},
    },
  ];

  return (
    <View className="h-[100%] w-[100%] flex flex-col py-20 items-center gap-4 pb-20 px-2 relative">
      <View
        style={{ gap: 60 }}
        className="flex flex-row w-full items-center px-4"
      >
        {/* FIXED: add color and size explicitly */}
        <ArrowLeft color="#000" size={28} onPress={() => setCount(count - 1)} />
        <Text className="text-xl font-bold">Create new account</Text>
      </View>

      <Text className="text-center px-4">
        Begin with creating a new free account. This helps you get started in
        Vyoma world.
      </Text>

      <Button
        onPress={() => setCount(count + 1)}
        mode={"contained-tonal"}
        textColor="white"
        icon={"email"}
        maxFontSizeMultiplier={1}
        style={{
          borderRadius: 16,
          height: 50,
          backgroundColor: "#6400CD",
          width: "90%",
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
        labelStyle={{
          fontSize: 15,
          fontWeight: "semibold",
        }}
      >
        Continue with Email
      </Button>

      <View>
        <Text>or</Text>
      </View>

      <View style={{ width: "100%" }}>
        <FlatList
          data={oAuthOptions}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{
            display: "flex",
            gap: 10,
            paddingHorizontal: 18,
          }}
          renderItem={({ item }) => (
            <Button
              mode="outlined"
              textColor="black"
              icon={
                item.icon as React.ComponentProps<
                  typeof MaterialCommunityIcons
                >["name"]
              }
              style={{
                borderRadius: 16,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={item.action}
              labelStyle={{ fontSize: 16, fontWeight: "semibold" }}
            >
              Continue with {item.name}
            </Button>
          )}
        />
      </View>

      <View className="absolute bottom-20 w-[70%]">
        <Text className="text-center text-gray-700 text-sm">
          By using Vyoma, you agree to our{" "}
          <Text className="text-gray-600 font-semibold">Terms</Text>
          {" and "}
          <Text className="text-gray-600 font-semibold">Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}