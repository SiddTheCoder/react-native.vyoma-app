import { useEffect } from "react";
import { useRouter, Slot } from "expo-router";
import { useAppSelector } from "@/src/store/hooks";
import { ActivityIndicator, View } from "react-native";

export default function RouterGate({ initialized }: { initialized: boolean }) {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!initialized || loading) return;

    const route = isAuthenticated ? "/(tabs)" : "/";
    console.log("🔁 Redirecting to:", route);

    // Reset stack to avoid stale navigation states
    router.replace(route);
  }, [isAuthenticated, initialized, loading]);

  if (!initialized || loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
