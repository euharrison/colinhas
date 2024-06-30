import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./db";

export async function deleteSheet(id: string) {
  return await deleteDoc(doc(db, "sheets", id));
}
