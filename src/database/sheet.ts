import {
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  FirestoreError,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { auth } from "../auth/auth";
import { nonNullable } from "../utils";
import { db } from "./db";
import { Sheet } from "./types";

const prodCollection = "musics";
const devCollection = "sheets-dev";

let sheetsCollection =
  process.env.NODE_ENV === "development" ? devCollection : prodCollection;

export const updateDbEnv = (env?: "prod" | "dev") => {
  if (env === "prod") {
    sheetsCollection = prodCollection;
  }
  if (env === "dev") {
    sheetsCollection = devCollection;
  }
};

export function createSheet(
  data: Pick<Sheet, "name" | "data" | "instrument" | "key">,
) {
  const docRef = doc(collection(db, sheetsCollection));
  setDoc(docRef, {
    name: data.name,
    data: data.data,
    instrument: data.instrument,
    key: data.key,
    userId: auth.currentUser?.uid,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export function editSheet(
  id: string,
  data: Pick<Sheet, "name" | "data" | "instrument" | "key">,
) {
  const docRef = doc(db, sheetsCollection, id);
  updateDoc(docRef, {
    name: data.name,
    data: data.data,
    instrument: data.instrument,
    key: data.key,
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

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
