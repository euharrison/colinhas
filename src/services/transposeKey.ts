import { Key, MajorKey, MinorKey } from "../database/types";

const majorArray: MajorKey[] = [
  "Do♭ Maior",
  "Sol♭ Maior",
  "Re♭ Maior",
  "La♭ Maior",
  "Mi♭ Maior",
  "Si♭ Maior",
  "Fa Maior",
  "Do Maior",
  "Sol Maior",
  "Re Maior",
  "La Maior",
  "Mi Maior",
  "Si Maior",
  "Fa♯ Maior",
  "Do♯ Maior",
];

const minorArray: MinorKey[] = [
  "La♭ menor",
  "Mi♭ menor",
  "Si♭ menor",
  "Fa menor",
  "Do menor",
  "Sol menor",
  "Re menor",
  "La menor",
  "Mi menor",
  "Si menor",
  "Fa♯ menor",
  "Do♯ menor",
  "Sol♯ menor",
  "Re♯ menor",
  "La♯ menor",
];

const isMinorKey = (key: Key): key is MinorKey => {
  return key.includes("menor");
};

const getArray = (key: Key) => {
  return isMinorKey(key) ? minorArray : majorArray;
};

export const getAccidental = (key: Key): "sharp" | "flat" => {
  const array = getArray(key);
  const index = array.findIndex((v) => v === key);
  return index > 6 ? "sharp" : "flat"; // index 6 = Fa Maior
};

export const transposeKey = (key: Key, offset: number): Key => {
  const array = getArray(key);
  const index = array.findIndex((v) => v === key);
  return array[index + offset] ?? key;
};
