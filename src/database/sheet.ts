import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  FirestoreError,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { auth } from "../auth/auth";
import { nonNullable } from "../utils";
import { db } from "./db";
import { Sheet } from "./types";

let sheetsCollection = "musics";

export const updateToDevEnv = () => {
  sheetsCollection = "sheets-dev";
};

export async function createSheet(
  data: Pick<Sheet, "name" | "data" | "instrument" | "key">,
) {
  return await addDoc(collection(db, sheetsCollection), {
    name: data.name,
    data: data.data,
    instrument: data.instrument,
    key: data.key,
    userId: auth.currentUser?.uid,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
}

export async function editSheet(
  id: string,
  data: Pick<Sheet, "name" | "data" | "instrument" | "key">,
) {
  return await updateDoc(doc(db, sheetsCollection, id), {
    name: data.name,
    data: data.data,
    instrument: data.instrument,
    key: data.key,
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

const getMillis = (value: unknown): number =>
  value instanceof Timestamp ? value.toMillis() : Date.now();

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
    userId: data.userId ?? "",
    updatedAt: getMillis(data.updatedAt),
    createdAt: getMillis(data.createdAt),
    syncing: snapshot.metadata.hasPendingWrites,
  };
};
