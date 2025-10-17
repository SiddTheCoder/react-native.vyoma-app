import React from "react";
import { Text } from "react-native";

const TermsAndPrivacy = () => {
  return (
    <Text className="text-center text-gray-700 text-sm">
      By using Vyoma, you agree to our{" "}
      <Text className="text-gray-600 font-semibold">Terms</Text>
      {" and "}
      <Text className="text-gray-600 font-semibold">Privacy Policy</Text>
    </Text>
  );
};

export default TermsAndPrivacy;
