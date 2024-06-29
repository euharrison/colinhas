import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth } from "../auth/auth";
import { db } from "./db";
import { Sheet } from "./types";

export async function editSheet(
  id: string,
  data: Pick<Sheet, "name" | "data">,
) {
  return await updateDoc(doc(db, "sheets", id), {
    ...data,
    userId: auth.currentUser?.uid,
    // TODO
    // instrumentId: "trombone",
    updatedAt: serverTimestamp(),
  });
}
