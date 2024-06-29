import { collection, getDocs } from "firebase/firestore";
import { db } from "./db";

export async function getSheets() {
  const sheetsCol = collection(db, "sheets");
  const sheetsSnapshot = await getDocs(sheetsCol);
  const sheetList = sheetsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return sheetList;
}
