export type Instrument = "Sax" | "Trompete" | "Trombone" | "Tuba";

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
