import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../services/firebaseApp";

export const db = getFirestore(firebaseApp);

export const sheetsCollection = "sheets";
