import React from "react";
import { Text } from "@/src/components/ThemedText";

const TermsAndPrivacy = () => {
  return (
    <Text className="text-center text-gray-700 text-sm">
      By using Vyoma, you agree to our{" "}
      <Text
        style={{ fontWeight: "bold" }}
        className="text-gray-600 font-semibold"
      >
        Terms
      </Text>
      {" and "}
      <Text
        style={{ fontWeight: "bold" }}
        className="text-gray-600 font-semibold"
      >
        Privacy Policy
      </Text>
    </Text>
  );
};

export default TermsAndPrivacy;
