export type Sheet = {
  id: string;
  name: string;
  data: string;
  instrumentId: string;
  userId: string;
  updatedAt: number;
  createdAt: number;
  syncing?: boolean;
};
