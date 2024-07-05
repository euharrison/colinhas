import { AuthError } from "firebase/auth";
import { useCallback } from "react";
import { loginWithGoogle } from "../auth/loginWithGoogle";
import { alert } from "../services/alert";

export const useLoginWithGoogle = () => {
  return useCallback(async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      if ((error as AuthError).code !== "auth/popup-closed-by-user") {
        alert(String(error));
      }
    }
  }, []);
};
