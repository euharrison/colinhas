import { FirestoreError, collection, onSnapshot } from "firebase/firestore";
import { db, sheetsCollection } from "./db";
import { Sheet } from "./types";

export async function subscribeSheets(
  onUpdate: (sheets: Sheet[]) => void,
  onError: (error: FirestoreError) => void,
) {
  return onSnapshot(
    collection(db, sheetsCollection),
    (snapshot) => {
      const sheets = snapshot.docs.map((doc) => {
        const data = doc.data({ serverTimestamps: "estimate" });
        return {
          id: doc.id,
          name: data.name,
          data: data.data,
          instrument: data.instrument,
          keySignature: data.keySignature,
          userId: data.userId,
          updatedAt: data.updatedAt.seconds,
          createdAt: data.createdAt.seconds,
          syncing: doc.metadata.hasPendingWrites,
        };
      });
      onUpdate(sheets);
    },
    onError,
  );
}
