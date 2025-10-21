import { Input, InputField, InputSlot } from "@/components/ui/input";
import { emailValidation, passwordValidation } from "@/src/schemas/validation";
import { setUser } from "@/src/store/features/auth/authSlice";
import { useAppDispatch } from "@/src/store/hooks";
import { saveToken } from "@/src/utils/authTokenManager";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";
import { MotiText, MotiView } from "moti";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import TermsAndPrivacy from "../../TermsAndPrivacy";
import { Text } from "@/src/components/ThemedText";

const SigninWithCredentials = () => {
  const router = useRouter();
  const dispacth = useAppDispatch();
  const [message, setMessage] = React.useState<string | undefined>("");
  const [errorMsg, setErrorMsg] = React.useState<string | undefined>("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isReadyToSubmit, setIsReadyToSubmit] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [data, setData] = React.useState({
    identifier: "",
    password: "",
  });

  const handleTextChange = (field: string, value: string) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  const handleSignin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_API_END_POINT}/mobile/signin`,
        data
      );
      const result = res.data;
      console.log("result after signing", JSON.stringify(result, null, 2));
      if (result.success) {
        setIsLoggedIn(true);
        setTimeout(() => {
          console.log(
            "dispatching user",
            JSON.stringify(result.data.user, null, 2)
          );
          dispacth(setUser(result.data));
          saveToken(result.data.token);
          router.replace("/(tabs)");
        }, 2000);
      } else {
        setErrorMsg(result.message);
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(
          error.response?.data.message || "An error occurred. Please try again."
        );
      }
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data.identifier && data.password) {
      const identZod = emailValidation.safeParse({
        email: data.identifier,
      });
      const passZod = passwordValidation.safeParse({ password: data.password });
      const isValid = identZod.success && passZod.success;
      if (!isValid) {
        setErrorMsg("Invalid email or password");
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      }
      setIsReadyToSubmit(isValid);
    }
  }, [data.identifier, data.password]);

  return (
    <View
      style={{ paddingTop: 30 }}
      className="h-[100%] w-[100%] flex flex-col items-center gap-4 pb-20 px-2 relative"
    >
      <View
        style={{ gap: 70 }}
        className="flex flex-row w-full items-center px-4"
      >
        <ArrowLeft color="#000" size={28} onPress={() => router.back()} />
        <Text className="text-xl font-bold">Sigin into account</Text>
      </View>

      <Text className="w-[70%] text-center">
        Welcome back buddy. Vyoma all cell awaits you.
      </Text>
      <Text style={{ paddingLeft: 10 }} className="w-[90%]">
        Email
      </Text>
      <Input
        aria-label="email"
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        className="rounded-2xl h-14 w-[90%] mx-auto"
      >
        <InputField
          className="text-black"
          placeholder="Enter your email"
          value={data.identifier}
          onChangeText={(text) => handleTextChange("identifier", text)}
          multiline={false}
        />
      </Input>

      <Text style={{ paddingLeft: 10 }} className="w-[90%]">
        Password
      </Text>
      <Input
        aria-label="password"
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        className="rounded-2xl h-14 w-[90%] mx-auto relative"
        style={{ paddingRight: 10 }}
        >
        <InputField
        className="text-black"
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={data.password}
          onChangeText={(text) => {
            handleTextChange("password", text);
          }}
        />
        <InputSlot onPress={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </InputSlot>
      </Input>

      {message ? (
        <Text className="text-green-500 w-[85%] text-left">{message}</Text>
      ) : null}
      {errorMsg ? (
        <Text className="text-red-500 w-[85%] text-left">{errorMsg}</Text>
      ) : null}

      <Button
        disabled={!isReadyToSubmit}
        onPress={handleSignin}
        textColor="white"
        style={{
          borderRadius: 16,
          height: 50,
          backgroundColor: `${isReadyToSubmit ? "#6400CD" : "#D1D5DB"}`,
          width: "90%",
          marginTop: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
        labelStyle={{
          fontSize: 15,
          fontWeight: "600",
        }}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          "Signin"
        )}
      </Button>

      <View className="absolute bottom-10 w-[70%]">
        <TermsAndPrivacy />
      </View>
      {isLoggedIn && <GreetAccountSignedIn />}
    </View>
  );
};

export default SigninWithCredentials;

const { width, height } = Dimensions.get("window");
function GreetAccountSignedIn() {
  const router = useRouter();
  useEffect(() => {
    // ✅ subtle vibration when animation starts
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // ✅ navigate after animation finishes (2s)
    const timer = setTimeout(() => {
      console.log("Navigating to Home");
      router.replace("/(tabs)");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated gradient background */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1500 }}
        style={StyleSheet.absoluteFill}
      >
        <LinearGradient
          colors={["#ffffff", "#8A2BE2", "#6A5ACD"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </MotiView>

      {/* Ripple burst from center */}
      <MotiView
        from={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 6, opacity: 0 }}
        transition={{ type: "timing", duration: 1500 }}
        style={styles.ripple}
      />

      {/* Checkmark icon pop */}
      <MotiView
        from={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 10, mass: 1 }}
        style={{ marginBottom: 10 }}
      >
        <Ionicons name="checkmark-circle" size={80} color="#ffffff" />
      </MotiView>

      {/* Success Text fade-in */}
      <MotiText
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800 }}
        style={styles.text}
      >
        Account signed in successfully!
      </MotiText>

      {/* Optional subtle subtext */}
      <MotiText
        from={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1000, duration: 800 }}
        style={styles.subText}
      >
        Redirecting to Home now ...
      </MotiText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height,
    width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    overflow: "hidden",
  },
  ripple: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  text: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  subText: {
    marginTop: 8,
    fontSize: 14,
    color: "#E0E0E0",
    textAlign: "center",
  },
});
