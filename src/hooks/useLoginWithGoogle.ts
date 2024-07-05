import { AuthError } from "firebase/auth";
import { useCallback } from "react";
import { Alert } from "react-native";
import { loginWithGoogle } from "../auth/loginWithGoogle";

export const useLoginWithGoogle = () => {
  return useCallback(async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      if ((error as AuthError).code !== "auth/popup-closed-by-user") {
        Alert.alert(String(error));
      }
    }
  }, []);
};
