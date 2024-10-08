import {
  browserPopupRedirectResolver,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./auth";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
  return signInWithPopup(auth, provider, browserPopupRedirectResolver);
};
