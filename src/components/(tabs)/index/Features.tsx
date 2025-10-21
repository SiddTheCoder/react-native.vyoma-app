import { Text } from "@/src/components/ThemedText";
import {
  BookOpen,
  Briefcase,
  Calendar,
  GraduationCap,
  Home,
  Lightbulb,
  Pencil,
  Search,
  UserCheck,
  Users,
} from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const iconMap: any = {
  Home,
  Search,
  Lightbulb,
  Pencil,
  BookOpen,
  UserCheck,
  Calendar,
  GraduationCap,
  Briefcase,
  Users,
};

const Features = () => {
  const featureslist = [
    {
      title: "Interview",
      icon: "Home",
      color: "yellow",
      action: () => {},
    },
    {
      title: "Resume",
      icon: "GraduationCap",
      color: "blue",
      action: () => {},
    },
    {
      title: "Hires Job",
      icon: "Search",
      color: "green",
      action: () => {},
    },
    {
      title: "Networking",
      icon: "Users",
      color: "blue",
      action: () => {},
    },
    {
      title: "Career",
      icon: "Lightbulb",
      color: "yellow",
      action: () => {},
    },
  ];

  const renderIcon = (iconName: string, iconColor?: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={20} color={iconColor} /> : null;
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
        paddingHorizontal: 15,
      }}
    >
      {featureslist.map((feature, index) => (
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          key={index}
          onPress={feature.action}
        >
          <View style={styles.card}>
            <View>{renderIcon(feature.icon)}</View>
          </View>
          <Text style={styles.title}>{feature.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Features;

const styles = StyleSheet.create({
  card: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  title: {
    fontSize: 10,
    color: "#374151",
    textAlign: "center",
    fontWeight: "500",
  },
});
