import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import {
  logout,
  setLoading,
  setUser,
} from "@/src/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { deleteToken, getToken } from "@/src/utils/authTokenManager";
import axios from "axios";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { RootState, store } from "../src/store/store";
import LoadingScreen from "@/src/components/local/LoadingScreen";

SplashScreen.preventAutoHideAsync();

function AppNavigator() {
  const { isAuthenticated, loading } = useAppSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("hitting api");
        dispatch(setLoading(true));

        const token = await getToken();
        console.log("token", token);

        if (!token) {
          dispatch(logout());
          console.log("No token found");
          return;
        }

        const res = await axios.get(
          `${process.env.EXPO_PUBLIC_API_END_POINT}/mobile/session`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("res", JSON.stringify(res.data.data, null, 2));

        if (res.data.data) {
          dispatch(setUser(res.data.data));
        } else {
          await deleteToken();
          dispatch(logout());
        }
      } catch (error) {
        console.error("❌ Session check failed:", error);
        await deleteToken();
        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
        setIsInitialized(true);
        await SplashScreen.hideAsync();
      }
    };

    // Only run session check on mount
    if (!isInitialized) {
      checkSession();
    }
  }, [dispatch, isInitialized]);

  // Show loading only during initial session check
  if (loading && !isInitialized) {
    return <LoadingScreen />
  }

  console.log("isAuthenticated", isAuthenticated);

  
  return (
    <Stack key={isAuthenticated ? "tabs" : "index"} screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="index" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GluestackUIProvider mode="system">
          <AppNavigator />
        </GluestackUIProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
