import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import {
  logout,
  setLoading,
  setUser,
} from "@/src/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { getToken } from "@/src/utils/authTokenManager";
import axios from "axios";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Provider } from "react-redux";
import { RootState, store } from "../src/store/store";

SplashScreen.preventAutoHideAsync(); // 👈 Keeps splash visible until we're ready

function AppNavigator() {
  const { isAuthenticated, loading } = useAppSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();

  const checkSession = useCallback(async () => {
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

      console.log(
        "hitting the api function with token",
        token,
        " with env",
        process.env.EXPO_PUBLIC_API_END_POINT
      );
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
        // await deleteToken();
        dispatch(logout());
      }
    } catch (error) {
      console.error("❌ Session check failed:", error);
      // await deleteToken();
      dispatch(logout());
    } finally {
      dispatch(setLoading(false));
      await SplashScreen.hideAsync(); // 👈 Hide splash *after everything is ready*
    }
  }, [dispatch]);

  useEffect(() => {
    checkSession();
    (async () => {
      const token = await getToken();
      console.log("token:", token);
    })();
  }, [checkSession]);

  // useEffect(() => {
  //   (async () => {
  //     // saveToken(
  //     //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGYyNTIzNGUwZGViYWQ1NzdhMmEzYzYiLCJlbWFpbCI6InNoYW1iaHV5YWRhdjkwMDFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJzaGFtYmh1eWFkYXY5MDAxIiwiaWF0IjoxNzYwNzExMjgyLCJleHAiOjE3NjEzMTYwODJ9.S_smxgE2ujHc_XtW5sfXO-f_CTPVU4AA11tu69ukdLY"
  //     // );
  //     const token = await getToken();
  //     console.log("🎯 Retrieved:", token);
  //   })();
  // }, []);

  if (loading) {
    // Optional fallback (should rarely show)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log("isAuthenticated", isAuthenticated);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)/index" />
      ) : (
        <Stack.Screen name="(auth)/signup" />
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
