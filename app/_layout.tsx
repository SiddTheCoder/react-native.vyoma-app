import React from "react";
import { Stack } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { store, RootState } from "../src/store/store";
import { View, ActivityIndicator } from "react-native";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';


function AppNavigator() {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" /> // → app/(tabs)/index.tsx
      ) : (
        <Stack.Screen name="auth" /> // → app/auth/index.tsx
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
