export type Instrument =
  | "Flauta"
  | "Clarinete"
  | "Sax Soprano"
  | "Sax Alto"
  | "Sax Tenor"
  | "Trompete"
  | "Trombone"
  | "Eufônio"
  | "Tuba";

export type KeySignature =
  | "♭♭♭♭♭♭♭"
  | "♭♭♭♭♭♭"
  | "♭♭♭♭♭"
  | "♭♭♭♭"
  | "♭♭♭"
  | "♭♭"
  | "♭"
  | " "
  | "♯"
  | "♯♯"
  | "♯♯♯"
  | "♯♯♯♯"
  | "♯♯♯♯♯"
  | "♯♯♯♯♯♯"
  | "♯♯♯♯♯♯♯";

export type MajorKey =
  | "Do♭ Maior"
  | "Sol♭ Maior"
  | "Re♭ Maior"
  | "La♭ Maior"
  | "Mi♭ Maior"
  | "Si♭ Maior"
  | "Fa Maior"
  | "Do Maior"
  | "Sol Maior"
  | "Re Maior"
  | "La Maior"
  | "Mi Maior"
  | "Si Maior"
  | "Fa♯ Maior"
  | "Do♯ Maior";

export type MinorKey =
  | "La♭ menor"
  | "Mi♭ menor"
  | "Si♭ menor"
  | "Fa menor"
  | "Do menor"
  | "Sol menor"
  | "Re menor"
  | "La menor"
  | "Mi menor"
  | "Si menor"
  | "Fa♯ menor"
  | "Do♯ menor"
  | "Sol♯ menor"
  | "Re♯ menor"
  | "La♯ menor";

export type Key = MajorKey | MinorKey;

export type Accidental = "sharp" | "flat";

export type Sheet = {
  id: string;
  name: string;
  data: string;
  instrument: Instrument;
  key?: Key;
  userId: string;
  updatedAt: number;
  createdAt: number;
  syncing: boolean;
};
