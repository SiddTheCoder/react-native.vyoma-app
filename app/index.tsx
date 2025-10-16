import { Text, View, Button } from "react-native";
import axios from "axios";

export default function Index() {
  const getEmailCheck = async () => {
    try {
      const { data } = await axios.post(
        "http://192.168.1.88:3000/api/mobile/check-email-availability",
        {
          email: "F4TmC@example.com",
        }
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="Check email" onPress={getEmailCheck} />
    </View>
  );
}
