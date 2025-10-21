import Features from "@/src/components/(tabs)/index/Features";
import Header from "@/src/components/(tabs)/index/Header";
import Search from "@/src/components/(tabs)/index/Search";
import Ads from "@/src/components/(tabs)/index/ads";
import { Text } from "@/src/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

const index = () => {
  const router = useRouter();

  const handleLogout = async () => {
    console.log("hitting the func to rep");
    router.replace("/(helper)/LogoutAndRedirectToHome");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#D7A7B7", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
      <LinearGradient
        colors={["transparent", "#B1BCDD"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />

      {/* Content */}
      <View style={styles.content}>
        <View id="top-card" style={{ paddingHorizontal: 20, marginBottom: 15 }}>
          <Header />
          <Search />
          <Features />
          <Ads />
        </View>

        <View
          id="second-card"
          style={{
            flex: 1,
            backgroundColor: "white",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          {" "}
          <Button onPress={handleLogout}>
            <Text>Logout</Text>
          </Button>
        </View>

        {/* Add more content here */}
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: "55%",
  },
  content: {
    flex: 1,
    paddingTop: 50,
  },
});
