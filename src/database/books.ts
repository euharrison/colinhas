import {
  arrayRemove,
  arrayUnion,
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
import { Book } from "./types";
import { getMillis } from "./utils";

const booksCollection = "books";

export function createBook(name: string) {
  const docRef = doc(collection(db, booksCollection));
  setDoc(docRef, {
    name,
    sheets: [],
    userId: auth.currentUser?.uid,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export function deleteBook(id: string) {
  return deleteDoc(doc(db, booksCollection, id));
}

export function appendSheetToBook(id: string, sheetId: string) {
  const docRef = doc(db, booksCollection, id);
  updateDoc(docRef, {
    sheets: arrayUnion(sheetId),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export function removeSheetFromBook(id: string, sheetId: string) {
  const docRef = doc(db, booksCollection, id);
  updateDoc(docRef, {
    sheets: arrayRemove(sheetId),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export function updateBookSheets(id: string, sheets: string[]) {
  const docRef = doc(db, booksCollection, id);
  updateDoc(docRef, {
    sheets,
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export function renameBook(id: string, name: string) {
  const docRef = doc(db, booksCollection, id);
  updateDoc(docRef, {
    name,
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export const observeBook = (
  id: string,
  onUpdate: (book?: Book) => void,
  onError: (error: FirestoreError) => void,
) => {
  return onSnapshot(
    doc(db, booksCollection, id),
    { includeMetadataChanges: true },
    (snapshot) => {
      onUpdate(docToBook(snapshot));
    },
    onError,
  );
};

export const observeBookCollection = (
  onUpdate: (allLists: Book[]) => void,
  onError: (error: FirestoreError) => void,
) => {
  return onSnapshot(
    collection(db, booksCollection),
    { includeMetadataChanges: true },
    (snapshot) => {
      onUpdate(snapshot.docs.map((doc) => docToBook(doc)).filter(nonNullable));
    },
    onError,
  );
};

const docToBook = (snapshot: DocumentSnapshot): Book | undefined => {
  const data = snapshot.data({ serverTimestamps: "estimate" });
  if (!data) {
    return undefined;
  }
  return {
    id: snapshot.id,
    name: data.name ?? "",
    sheets: data.sheets ?? [],
    userId: data.userId ?? "",
    updatedAt: getMillis(data.updatedAt),
    createdAt: getMillis(data.createdAt),
    syncing: snapshot.metadata.hasPendingWrites,
  };
};
