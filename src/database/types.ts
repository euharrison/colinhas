export type Sheet = {
  id: string;
  name: string;
  data: string;
  instrument: string;
  userId: string;
  updatedAt: number;
  createdAt: number;
  syncing?: boolean;
};
