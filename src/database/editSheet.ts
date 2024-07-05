import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth } from "../auth/auth";
import { db, sheetsCollection } from "./db";
import { Sheet } from "./types";

export async function editSheet(
  id: string,
  data: Pick<Sheet, "name" | "data" | "instrument" | "keySignature">,
) {
  return await updateDoc(doc(db, sheetsCollection, id), {
    name: data.name,
    data: data.data,
    instrument: data.instrument,
    keySignature: data.keySignature,
    userId: auth.currentUser?.uid,
    updatedAt: serverTimestamp(),
  });
}
