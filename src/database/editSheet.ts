import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth } from "../auth/auth";
import { db } from "./db";
import { Sheet } from "./types";

export async function editSheet(
  id: string,
  data: Pick<Sheet, "name" | "data" | "instrument">,
) {
  return await updateDoc(doc(db, "sheets", id), {
    name: data.name,
    data: data.data,
    instrument: data.instrument,
    userId: auth.currentUser?.uid,
    updatedAt: serverTimestamp(),
  });
}
