import { logout } from "@/src/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { deleteToken } from "@/src/utils/authTokenManager";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const LogoutAndRedirectToHome = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    deleteToken()
    dispatch(logout())
    router.replace("/");
  }, []);
  return null;
};

export default LogoutAndRedirectToHome;


{/* <LogoutAndRedirectToHome /> : 
  
  *** This is a helper component to logout the user and redirect them to the home page.
 
  #TODO: Reason was router.replace("/") was not working from the main component (signupWithCredentails) . so for now we are using this helper component . 
  if you have any better idea please let me know via 
  #TODO siddthecoder@gmail.com or github.com/siddthecoder
  
  */}