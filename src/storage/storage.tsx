import { getStorage } from "firebase/storage";
import { firebaseApp } from "../services/firebaseApp";

export const storage = getStorage(firebaseApp);
