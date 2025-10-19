import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthOptionsPage from "@/src/components/local/auth/AuthOptionsPage";
import SigninWithCredentials from "@/src/components/local/auth/signin/SigninWithCredentials";

const Signin = () => {
  const [count, setCount] = React.useState(1);
  if (count === 1) {
    return (
      <SafeAreaView>
        <AuthOptionsPage setCount={setCount} count={count} source_utm={"signin"} />
      </SafeAreaView>
    );
  } else if (count === 2) {
    return (
      <SafeAreaView>
        <SigninWithCredentials />
      </SafeAreaView>
    );
  }
};

export default Signin;
