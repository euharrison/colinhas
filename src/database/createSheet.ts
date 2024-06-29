import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth } from "../auth/auth";
import { db } from "./db";
import { Sheet } from "./types";

export async function createSheet(data: Pick<Sheet, "name" | "data">) {
  return await addDoc(collection(db, "sheets"), {
    ...data,
    userId: auth.currentUser?.uid,
    // TODO
    // instrumentId: "trombone",
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
}
