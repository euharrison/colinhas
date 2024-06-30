import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../services/firebaseConfig";

export const db = getFirestore(firebaseApp);

export const sheetsCollection = "sheets";
