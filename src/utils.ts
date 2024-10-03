import { Key, KeySignature, MajorKey, MinorKey } from "./database/types";

export const nonNullable = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined;

export const slugify = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/[\s-]+/g, "-");
};

export const keySignatureMap: [KeySignature, MajorKey, MinorKey, number][] = [
  ["♭♭♭♭♭♭♭", "Do♭ Maior", "La♭ menor", -1],
  ["♭♭♭♭♭♭", "Sol♭ Maior", "Mi♭ menor", +6],
  ["♭♭♭♭♭", "Re♭ Maior", "Si♭ menor", +1],
  ["♭♭♭♭", "La♭ Maior", "Fa menor", -4],
  ["♭♭♭", "Mi♭ Maior", "Do menor", +3],
  ["♭♭", "Si♭ Maior", "Sol menor", -2],
  ["♭", "Fa Maior", "Re menor", +5],
  [" ", "Do Maior", "La menor", 0],
  ["♯", "Sol Maior", "Mi menor", -5],
  ["♯♯", "Re Maior", "Si menor", +2],
  ["♯♯♯", "La Maior", "Fa♯ menor", -3],
  ["♯♯♯♯", "Mi Maior", "Do♯ menor", +4],
  ["♯♯♯♯♯", "Si Maior", "Sol♯ menor", -1],
  ["♯♯♯♯♯♯", "Fa♯ Maior", "Re♯ menor", +6],
  ["♯♯♯♯♯♯♯", "Do♯ Maior", "La♯ menor", +1],
];

export const getKeySignature = (key: Key): KeySignature | undefined => {
  return keySignatureMap.find(
    (item) => item[1] === key || item[2] === key,
  )?.[0];
};
