import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "authToken";

export async function saveToken(token: string) {
  try {
    if (token) {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      console.log("✅ Token saved successfully");
    } else {
      console.warn("⚠️ Tried to save empty token");
    }
  } catch (err) {
    console.error("❌ Error saving token:", err);
  }
}

export async function getToken() {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    console.log("🔍 Token fetched:", token);
    return token;
  } catch (err) {
    console.error("❌ Error getting token:", err);
    return null;
  }
}



export async function deleteToken() {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    console.log("🧹 Token deleted");
  } catch (err) {
    console.error("❌ Error deleting token:", err);
  }
}

export default { saveToken, getToken, deleteToken };
