import { logout } from "@/src/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { deleteToken } from "@/src/utils/authTokenManager";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

const index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    console.log("hitting the func to rep")
    router.replace("/(helper)/LogoutAndRedirectToHome");
  };
  

  return (
    <View style={{ marginTop: 40 }}>
      <Text className="text-4xl">Home finally, {user.username}</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </View>
  );
};

export default index;
