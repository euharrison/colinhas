import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth } from "../auth/auth";
import { db, sheetsCollection } from "./db";
import { Sheet } from "./types";

export async function createSheet(
  data: Pick<Sheet, "name" | "data" | "instrument">,
) {
  return await addDoc(collection(db, sheetsCollection), {
    name: data.name,
    data: data.data,
    instrument: data.instrument,
    userId: auth.currentUser?.uid,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
}
