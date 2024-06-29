import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./db";
import { Sheet } from "./types";

export async function createSheet(
  data: Pick<Sheet, "name" | "slug" | "data" | "tone">,
) {
  // TODO
  // instrumentId, userId
  return await addDoc(collection(db, "sheets"), {
    ...data,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
}
