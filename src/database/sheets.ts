import {
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  FirestoreError,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth } from "../auth/auth";
import { nonNullable } from "../utils";
import { db } from "./db";
import { Sheet } from "./types";
import { getMillis } from "./utils";

const sheetsCollection = "sheets";

export const createSheet = (data: Partial<Sheet>) => {
  const docRef = doc(collection(db, sheetsCollection));
  setDoc(docRef, {
    name: data.name,
    data: data.data,
    instrument: data.instrument,
    key: data.key ?? "",
    unlisted: data.unlisted ?? false,
    userId: auth.currentUser?.uid,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const editSheet = (id: string, data: Partial<Sheet>) => {
  const docRef = doc(db, sheetsCollection, id);
  updateDoc(docRef, {
    name: data.name,
    data: data.data,
    instrument: data.instrument,
    key: data.key ?? "",
    unlisted: data.unlisted ?? false,
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export function deleteSheet(id: string) {
  return deleteDoc(doc(db, sheetsCollection, id));
}

export const observeSheet = (
  id: string,
  onUpdate: (sheet?: Sheet) => void,
  onError: (error: FirestoreError) => void,
) => {
  return onSnapshot(
    doc(db, sheetsCollection, id),
    { includeMetadataChanges: true },
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
    { includeMetadataChanges: true },
    (snapshot) => {
      onUpdate(snapshot.docs.map((doc) => docToSheet(doc)).filter(nonNullable));
    },
    onError,
  );
};

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
    key: data.key ?? "",
    unlisted: data.unlisted ?? false,
    userId: data.userId ?? "",
    updatedAt: getMillis(data.updatedAt),
    createdAt: getMillis(data.createdAt),
    syncing: snapshot.metadata.hasPendingWrites,
  };
};
