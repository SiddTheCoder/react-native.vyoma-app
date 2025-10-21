import { Input, InputField, InputIcon } from "@/components/ui/input";
import { Search as FileSearch2 } from "lucide-react-native";
import React from "react";
import { View } from "react-native";


const Search = () => {
  return (
    <View style={{ marginTop: 20 }}>
      <Input
        style={{
          width: "100%",
          height: 40,
          borderRadius: 50,
          backgroundColor: "white",
          borderBlockColor: "white",
          borderLeftColor: "white",
          borderRightColor: "white",
          paddingLeft: 20,
        }}
        className=""
      >
        <InputIcon as={FileSearch2} />
        <InputField
          placeholderClassName="text-black font-semibold"
          className="font-black text-black"
          placeholderTextColor={"black"}
          placeholder="Search millions of job templates ..."
        />
      </Input>
    </View>
  );
};

export default Search;
