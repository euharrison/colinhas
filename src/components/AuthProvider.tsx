import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect } from "react";
import { auth } from "../auth/auth";
import { login } from "../auth/login";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // TODO
        // console.log("AuthProvider", user.uid);
      }
    });
    login();
  }, []);

  return <>{children}</>;
};
