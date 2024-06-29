import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth } from "../services/auth";
import { db } from "./db";
import { Sheet } from "./types";

export async function createSheet(
  data: Pick<Sheet, "name" | "slug" | "data" | "tone">,
) {
  return await addDoc(collection(db, "sheets"), {
    ...data,
    userId: auth.currentUser?.uid,
    // TODO
    instrumentId: "sax",
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
}
