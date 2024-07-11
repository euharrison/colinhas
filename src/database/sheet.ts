import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  FirestoreError,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth } from "../auth/auth";
import { nonNullable } from "../utils";
import { db, sheetsCollection } from "./db";
import { Sheet } from "./types";

export async function createSheet(data: Partial<Sheet>) {
  return await addDoc(collection(db, sheetsCollection), {
    ...data,
    userId: auth.currentUser?.uid,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
}

export async function editSheet(id: string, data: Partial<Sheet>) {
  return await updateDoc(doc(db, sheetsCollection, id), {
    ...data,
    userId: auth.currentUser?.uid,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteSheet(id: string) {
  return await deleteDoc(doc(db, sheetsCollection, id));
}

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
    key: data.key ?? data.keySignature ?? "", // TODO remover o keySignature legado
    userId: data.userId ?? "",
    updatedAt: data.updatedAt.seconds ?? Date.now(),
    createdAt: data.createdAt.seconds ?? Date.now(),
    syncing: snapshot.metadata.hasPendingWrites,
  };
};
