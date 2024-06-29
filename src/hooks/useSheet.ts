import { useContext } from "react";
import { DataContext } from "../database/context";

export const useSheet = (id: string) => {
  const data = useContext(DataContext);
  return data.find((item) => item.id === id);
};
