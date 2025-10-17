import React from "react";
import LandSignupPage from "@/src/components/local/auth/signup/LandSignupPage";
import SignupWithCredentials from "@/src/components/local/auth/signup/SignupWithCredentials";
import AuthOptionsPage from "@/src/components/local/auth/signup/AuthOptionsPage";

const signup = () => {
  const [count, setCount] = React.useState(0);

  if (count === 0) {
    return <LandSignupPage setCount={setCount} />;
  } else if (count === 1) {
    return <AuthOptionsPage setCount={setCount} count={count} />;
  } else if (count === 2) {
    return <SignupWithCredentials setCount={setCount} count={count} />;
  }
};

export default signup;
