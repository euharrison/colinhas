import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../services/firebaseConfig";

export const db = getFirestore(firebaseApp);
