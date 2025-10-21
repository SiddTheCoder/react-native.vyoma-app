import { Text } from "@/src/components/ThemedText";
import { Tabs } from "expo-router";
import {
  GalleryVertical,
  Grip,
  Home,
  Layers,
  Slack,
} from "lucide-react-native";
import React from "react";
import { ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TabIcon = ({
  focused,
  name,
  icon,
}: {
  focused: boolean;
  name: string;
  icon: React.ReactNode;
}) => {
  const color = focused ? "#3B82F6" : "#9CA3AF";
  return (
    <>
      <ImageBackground className="flex items-center justify-center min-w-[70px] gap-1 h-12 flex-col">
        {icon}
        <Text style={{ color: color, fontSize: 10 }}>{name}</Text>
      </ImageBackground>
    </>
  );
};

const _layout = () => {
  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <View className="h-full">
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              position: "absolute",
              bottom: -50,
              backgroundColor: "white",
              height: 106,
              width: "100%",
              paddingTop: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            tabBarItemStyle: {
              marginTop: 5,
              borderRadius: 16,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              headerShown: false,
              title: "Home",
              tabBarIcon: ({ focused }) => {
                return (
                  <TabIcon
                    focused={focused}
                    name="Home"
                    icon={
                      <Home color={focused ? "#3B82F6" : "#9CA3AF"} size={20} />
                    }
                  />
                );
              },
            }}
          />

          <Tabs.Screen
            name="template"
            options={{
              headerShown: false,
              title: "Template",
              tabBarIcon: ({ focused }) => {
                return (
                  <TabIcon
                    focused={focused}
                    name="Template"
                    icon={
                      <GalleryVertical
                        color={focused ? "#3B82F6" : "#9CA3AF"}
                        size={20}
                      />
                    }
                  />
                );
              },
            }}
          />

          <Tabs.Screen
            name="interview"
            options={{
              headerShown: false,
              title: "Interview",
              tabBarIcon: ({ focused }) => {
                return (
                  <TabIcon
                    focused={focused}
                    name="Interview"
                    icon={
                      <Slack
                        color={focused ? "#3B82F6" : "#9CA3AF"}
                        size={20}
                      />
                    }
                  />
                );
              },
            }}
          />

          <Tabs.Screen
            name="history"
            options={{
              headerShown: false,
              title: "History",
              tabBarIcon: ({ focused }) => {
                return (
                  <TabIcon
                    focused={focused}
                    name="History"
                    icon={
                      <Layers
                        color={focused ? "#3B82F6" : "#9CA3AF"}
                        size={20}
                      />
                    }
                  />
                );
              },
            }}
          />

          <Tabs.Screen
            name="menu"
            options={{
              headerShown: false,
              title: "Menu",
              tabBarIcon: ({ focused }) => {
                return (
                  <TabIcon
                    focused={focused}
                    name="Menu"
                    icon={
                      <Grip color={focused ? "#3B82F6" : "#9CA3AF"} size={20} />
                    }
                  />
                );
              },
            }}
          />
        </Tabs>
      </View>
    </SafeAreaView>
  );
};

export default _layout;
