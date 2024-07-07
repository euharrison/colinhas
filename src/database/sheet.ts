import {
  collection,
  doc,
  DocumentSnapshot,
  FirestoreError,
  onSnapshot,
} from "firebase/firestore";
import { nonNullable } from "../utils";
import { db, sheetsCollection } from "./db";
import { Sheet } from "./types";

const docToSheet = (snapshot: DocumentSnapshot): Sheet | undefined => {
  const data = snapshot.data({ serverTimestamps: "estimate" });
  if (!data) {
    return undefined;
  }
  return {
    id: snapshot.id,
    name: data.name ?? "",
    data: data.data ?? "",
    instrument: data.instrument ?? "",
    keySignature: data.keySignature ?? "",
    userId: data.userId ?? "",
    updatedAt: data.updatedAt.seconds ?? Date.now(),
    createdAt: data.createdAt.seconds ?? Date.now(),
    syncing: snapshot.metadata.hasPendingWrites,
  };
};

export const observeSheet = (
  id: string,
  onUpdate: (sheet?: Sheet) => void,
  onError: (error: FirestoreError) => void,
) => {
  return onSnapshot(
    doc(db, sheetsCollection, id),
    (snapshot) => {
      onUpdate(docToSheet(snapshot));
    },
    onError,
  );
};

export const observeSheetCollection = (
  onUpdate: (sheetList: Sheet[]) => void,
  onError: (error: FirestoreError) => void,
) => {
  return onSnapshot(
    collection(db, sheetsCollection),
    (snapshot) => {
      onUpdate(snapshot.docs.map((doc) => docToSheet(doc)).filter(nonNullable));
    },
    onError,
  );
};
