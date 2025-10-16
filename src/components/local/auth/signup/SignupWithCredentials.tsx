import { Input, InputField, InputSlot } from "@/components/ui/input";
import { emailValidation } from "@/src/schemas/emailValidation";
import axios from "axios";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  CircleIcon,
  CheckIcon,
} from "lucide-react-native";
import React, { use, useEffect } from "react";
import { ActivityIndicator, Animated, Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { Button } from "react-native-paper";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
} from "@/components/ui/radio";
import { HStack } from "@/components/ui/hstack";
import { Icon, EditIcon } from "@/components/ui/icon";

const API_ENDPOINT = "http://192.168.1.88:3000/api/mobile";

function SendEmailForOTP({
  setCount,
  count,
  data,
  setData,
  steps,
  setSteps,
  handleTextChange,
}: any) {
  const [isStepOneReady, setIsStepOneReady] = React.useState(false);
  const [message, setMessage] = React.useState<string | undefined>("");
  const [errorMsg, setErrorMsg] = React.useState<string | undefined>("");
  const [isSendingEmail, setIsSendingEmail] = React.useState(false);

  const handleEmailContinue = async () => {
    setIsSendingEmail(true);
    const result = emailValidation.safeParse({ email: data.email });
    console.log("result", result);

    if (result.success) {
      try {
        const res = await axios.post(`${API_ENDPOINT}/signup/send-otp`, {
          email: data.email,
        });

        if (res.data.success) {
          setSteps(steps + 1);
          setMessage("OTP sent successfully!");
        }
      } catch (error) {
        setErrorMsg(
          "An error occurred while sending the email. Please try again later."
        );
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      } finally {
        setIsSendingEmail(false);
      }
    } else {
      setMessage("Please enter a valid email!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setIsSendingEmail(false);
    }
  };

  const checkUniqueEmail = async (email?: string) => {
    console.log("hitting api function with data", data.email);
    try {
      const res = await axios.post(`${API_ENDPOINT}/check-email-availability`, {
        email: data.email,
      });
      console.log(res.data);
      setIsStepOneReady(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          console.log("error", error.response.data.message);
          setErrorMsg(error.response.data.message);
          setTimeout(() => {
            setErrorMsg("");
          }, 5000);
          setIsStepOneReady(false);
        } else {
          console.error(
            "Error checking email:",
            error.response?.data || error.message
          );
          setMessage("Error checking email availability");
        }
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const result = emailValidation.safeParse({ email: data.email });

    if (result.success && data.email !== "") {
      const timeoutId = setTimeout(() => {
        console.log("hitting api now");
        checkUniqueEmail();
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setIsStepOneReady(false);
    }
  }, [data.email]);

  return (
    <View className="h-[100%] w-[100%] flex flex-col py-20 items-center gap-4 pb-20 px-2 relative">
      <View
        style={{ gap: 75 }}
        className="flex flex-row w-full items-center px-4"
      >
        <ArrowLeft color="#000" size={28} onPress={() => setCount(count - 1)} />
        <Text className="text-xl font-bold">Add your email</Text>
      </View>

      <View className="text-center px-16 mb-5 mt-0">
        <ProgressBars currentStep={steps} totalSteps={3} />
      </View>
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
          placeholder="Enter your email"
          value={data.email}
          onChangeText={(text) => handleTextChange("email", text)}
          multiline={false}
        />
      </Input>

      {message && (
        <Text className="text-green-500 w-[88%] text-left">{message}</Text>
      )}
      {errorMsg && (
        <Text className="text-red-500 w-[88%] text-left">{errorMsg}</Text>
      )}

      <Button
        disabled={!isStepOneReady || isSendingEmail}
        onPress={handleEmailContinue}
        textColor="white"
        style={{
          borderRadius: 16,
          height: 50,
          backgroundColor: `${
            isStepOneReady && !isSendingEmail ? "#6400CD" : "#D1D5DB"
          }`,
          width: "90%",
          marginTop: 6,
          justifyContent: "center",
          alignItems: "center",
        }}
        labelStyle={{
          fontSize: 15,
          fontWeight: "600",
        }}
      >
        {isSendingEmail ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          "Continue"
        )}
      </Button>

      <View className="absolute bottom-20 w-[70%]">
        <Text className="text-center text-gray-700 text-sm">
          By using Vyoma, you agree to our{" "}
          <Text className="text-gray-600 font-semibold">Terms</Text>
          {" and "}
          <Text className="text-gray-600 font-semibold">Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

function VerifyEmailOTP({ data, handleTextChange, setSteps, steps }: any) {
  const [message, setMessage] = React.useState<string | undefined>("");
  const [errorMsg, setErrorMsg] = React.useState<string | undefined>("");
  const [isVerifying, setIsVerifying] = React.useState(false);

  const handleVerifyOTP = async () => {
    setIsVerifying(true);
    try {
      const res = await axios.post(`${API_ENDPOINT}/signup/verify-otp`, {
        email: data.email,
        otp: data.otp,
      });

      if (res.data.success) {
        setMessage("Email verified successfully!");
        setTimeout(() => {
          setMessage("");
          setSteps(steps + 1);
        }, 1000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(
          error.response?.data?.message || "Invalid OTP. Please try again."
        );
      } else {
        setErrorMsg("An error occurred. Please try again.");
      }
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    } finally {
      setIsVerifying(false);
    }
  };
  return (
    <View className="h-[100%] w-[100%] flex flex-col py-20 items-center gap-4 pb-20 px-2 relative">
      <View
        style={{ gap: 75 }}
        className="flex flex-row w-full items-center px-4"
      >
        <ArrowLeft color="#000" size={28} onPress={() => setSteps(steps - 1)} />
        <Text className="text-xl font-bold">Verify your email</Text>
      </View>

      <View className="text-center px-16">
        <ProgressBars currentStep={steps} totalSteps={3} />
      </View>

      <Text className="mt-10 text-center px-4">
        We have just sent a 6 digit verification code to {data.email}
      </Text>

      <View className="w-[90%] mt-4">
        <OtpInput
          numberOfDigits={6}
          onTextChange={(text) => {
            handleTextChange("otp", text);
          }}
          focusColor="#A855F7"
          placeholder="######"
        />
      </View>

      {message && (
        <Text className="text-green-500 w-[88%] text-center">{message}</Text>
      )}
      {errorMsg && (
        <Text className="text-red-500 w-[88%] text-center">{errorMsg}</Text>
      )}

      <Button
        disabled={data.otp.length !== 6 || isVerifying}
        textColor="white"
        mode="contained"
        onPress={handleVerifyOTP}
        style={{
          borderRadius: 16,
          height: 50,
          backgroundColor: `${
            data.otp.length === 6 && !isVerifying ? "#6400CD" : "#D1D5DB"
          }`,
          width: "90%",
          marginTop: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
        labelStyle={{
          fontSize: 15,
          fontWeight: "600",
        }}
      >
        {isVerifying ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          "Verify"
        )}
      </Button>

      <Text>
        Wrong email?{" "}
        <Text
          onPress={() => setSteps(steps - 1)}
          className="text-gray-600 font-semibold"
        >
          Send to different email
        </Text>
      </Text>

      <View className="absolute bottom-20 w-[70%]">
        <Text className="text-center text-gray-700 text-sm">
          By using Vyoma, you agree to our{" "}
          <Text className="text-gray-600 font-semibold">Terms</Text>
          {" and "}
          <Text className="text-gray-600 font-semibold">Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

function AddPassword({ data, handleTextChange, setSteps, steps }: any) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [scorePercentage, setScorePercentage] = React.useState(0);
  const [requirements, setRequirements] = React.useState({
    length: false,
    number: false,
    special: false,
  });

  // Calculate password strength percentage
  const validatePassword = (password: string) => {
    const newRequirements = {
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    setRequirements(newRequirements);

    // Calculate percentage based on met requirements
    if (password.length === 0) {
      setScorePercentage(0);
    } else {
      const metCount = Object.values(newRequirements).filter(Boolean).length;
      const totalRequirements = 3;
      const percentage = (metCount / totalRequirements) * 100;
      setScorePercentage(percentage);
    }
  };

  // Get color based on password strength
  const getStrengthColor = () => {
    if (scorePercentage === 0) return "#E5E7EB"; // Gray for empty
    if (scorePercentage < 40) return "#EF4444"; // Red for weak
    if (scorePercentage < 70) return "#F59E0B"; // Orange/Yellow for medium
    if (scorePercentage < 100) return "#10B981"; // Light green for good
    return "#22C55E"; // Dark green for strong
  };

  const RequirementItem = ({ label, met }: { label: string; met: boolean }) => (
    <HStack alignItems="center" space="sm">
      <Icon
        as={met ? CheckIcon : CircleIcon}
        color={met ? "#22C55E" : "#9CA3AF"}
      />
      <Text color={met ? "#22C55E" : "#9CA3AF"}>{label}</Text>
    </HStack>
  );

  return (
    <View className="h-[100%] w-[100%] flex flex-col py-20 items-center gap-4 pb-20 px-2 relative">
      <View
        style={{ gap: 55 }}
        className="flex flex-row w-full items-center px-4"
      >
        <ArrowLeft color="#000" size={28} onPress={() => setSteps(steps - 1)} />
        <Text className="text-xl font-bold">Create your password</Text>
      </View>

      <View style={{ marginBottom: 20 }} className="text-center px-16">
        <ProgressBars currentStep={steps} totalSteps={3} />
      </View>

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
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={data.password}
          onChangeText={(text) => {
            handleTextChange("password", text);
            validatePassword(text);
          }}
          multiline={false}
        />
        <InputSlot onPress={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <Eye /> : <EyeOff />}
        </InputSlot>
      </Input>

      {/* Progress bar with dynamic color */}
      <View className="w-[90%] mt-0">
        <Progress value={scorePercentage} className="w-full h-2" size="sm">
          <ProgressFilledTrack
            style={{ backgroundColor: getStrengthColor() }}
          />
        </Progress>
      </View>

      {/* Labels */}
      <View className="w-full px-5">
        <RequirementItem
          label="8 characters or more"
          met={requirements.length}
        />
        <RequirementItem label="Includes a number" met={requirements.number} />
        <RequirementItem
          label="Includes a special character"
          met={requirements.special}
        />
      </View>

      <View className="absolute bottom-20 w-[70%]">
        <Text className="text-center text-gray-700 text-sm">
          By using Vyoma, you agree to our{" "}
          <Text className="text-gray-600 font-semibold">Terms</Text>
          {" and "}
          <Text className="text-gray-600 font-semibold">Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

export default function SignupWithCredentials({ setCount, count }: any) {
  const [steps, setSteps] = React.useState(3);

  const [data, setData] = React.useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleTextChange = (field: string, value: string) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  if (steps === 1) {
    return (
      <SendEmailForOTP
        data={data}
        setData={setData}
        steps={steps}
        setSteps={setSteps}
        count={count}
        setCount={setCount}
        handleTextChange={handleTextChange}
      />
    );
  } else if (steps === 2) {
    return (
      <VerifyEmailOTP
        data={data}
        handleTextChange={handleTextChange}
        steps={steps}
        setSteps={setSteps}
      />
    );
  } else if (steps === 3) {
    return (
      <AddPassword
        data={data}
        handleTextChange={handleTextChange}
        steps={steps}
        setSteps={setSteps}
      />
    );
  }

  return null;
}

const ProgressBars = ({ currentStep, totalSteps = 3 }: any) => {
  return (
    <View className="flex-row gap-1 w-full px-4 mt-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <Animated.View
          key={index}
          style={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            backgroundColor: index < currentStep ? "#6400CD" : "#D1D5DB",
          }}
        />
      ))}
    </View>
  );
};
