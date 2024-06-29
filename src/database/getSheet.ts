import { doc, getDoc, getDocFromCache } from "firebase/firestore";
import { db } from "./db";

export async function getSheet(id: string) {
  const docRef = doc(db, "sheets", id);
  // TODO
  // const docSnap = await getDocFromCache(docRef);
  const docSnap = await getDoc(docRef);
  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
}
