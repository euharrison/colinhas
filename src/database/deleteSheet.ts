import { deleteDoc, doc } from "firebase/firestore";
import { db, sheetsCollection } from "./db";

export async function deleteSheet(id: string) {
  return await deleteDoc(doc(db, sheetsCollection, id));
}
