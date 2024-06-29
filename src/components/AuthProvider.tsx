import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect } from "react";
import { auth } from "../services/auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("AuthProvider", user.uid);
      }
    });
  }, []);

  return <>{children}</>;
};
