import AuthOptionsPage from "@/src/components/local/auth/AuthOptionsPage";
import SignupWithCredentials from "@/src/components/local/auth/signup/SignupWithCredentials";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const signup = () => {
  const [count, setCount] = React.useState(1);

  if (count === 1) {
    return (
      <SafeAreaView>
        <AuthOptionsPage setCount={setCount} count={count} />
      </SafeAreaView>
    );
  } else if (count === 2) {
    return (
      <SafeAreaView>
        <SignupWithCredentials setCount={setCount} count={count} />
      </SafeAreaView>
    );
  }
};

export default signup;
