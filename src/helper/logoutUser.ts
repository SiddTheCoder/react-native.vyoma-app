import { useRouter } from "expo-router";

export const handleLogout = async () => {
  const router = useRouter();
  router.replace("/(helper)/LogoutAndRedirectToHome");
};
