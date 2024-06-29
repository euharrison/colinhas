import { collection, getDocs } from "firebase/firestore";
import { db } from "./db";
import { Sheet } from "./types";

export async function getSheets(): Promise<Sheet[]> {
  const sheetsCol = collection(db, "sheets");
  const sheetsSnapshot = await getDocs(sheetsCol);
  const sheetList = sheetsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      data: data.data,
      instrumentId: data.instrumentId,
      userId: data.userId,
      updatedAt: data.updatedAt.seconds,
      createdAt: data.createdAt.seconds,
    };
  });
  return sheetList;
}
