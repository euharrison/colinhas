import { initializeAuth } from "firebase/auth";
import { firebaseApp } from "../services/firebaseApp";
import { persistence } from "./persistence";

export const auth = initializeAuth(firebaseApp, {
  persistence,
});
