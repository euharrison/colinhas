import { signInAnonymously } from "firebase/auth";
import { auth } from "./auth";

export const login = () => {
  return signInAnonymously(auth);
};
