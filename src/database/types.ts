export type Instrument =
  | "Flauta"
  | "Clarinete"
  | "Sax Soprano"
  | "Sax Alto"
  | "Sax Tenor"
  | "Trompete"
  | "Trombone"
  | "Tuba";

export type Sheet = {
  id: string;
  name: string;
  data: string;
  instrument: Instrument;
  key: string;
  userId: string;
  updatedAt: number;
  createdAt: number;
  syncing: boolean;
};
