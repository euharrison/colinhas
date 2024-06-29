import { useContext } from "react";
import { DataContext } from "../database/context";

export const useSheetList = () => {
  const data = useContext(DataContext);
  return data.sort((a, b) => b.updatedAt - a.updatedAt);
};
