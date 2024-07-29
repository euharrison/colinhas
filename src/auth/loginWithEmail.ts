import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { appUrl } from "../urls";
import { auth } from "./auth";

const actionCodeSettings = {
  url: `${appUrl}/complete-login`,
  handleCodeInApp: true,
};

const localKey = "emailForSignIn";

export const loginWithEmail = async (email: string) => {
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  window.localStorage.setItem(localKey, email);
};

export const completeLoginWithEmail = async () => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem(localKey);
    if (!email) {
      email = window.prompt("Please provide your email for confirmation");
    }
    await signInWithEmailLink(auth, email || "", window.location.href);
    window.localStorage.removeItem(localKey);
  } else {
    throw new Error("invalid url");
  }
};
