import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { useAppSelector } from "@/src/store/hooks";
import { Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { Provider } from "react-redux";
import { RootState, store } from "../src/store/store";

function AppNavigator() {
  const { isAuthenticated, loading } = useAppSelector(
    (state: RootState) => state.auth
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading</Text>
      </View>
    );
  }

  console.log("isAuthenticated:", isAuthenticated);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" /> // → app/(tabs)/index.tsx
      ) : (
        <Stack.Screen name="(auth)/signup" /> // → app/auth/signup.tsx
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GluestackUIProvider mode="system">
        <AppNavigator />
      </GluestackUIProvider>
    </Provider>
  );
}
