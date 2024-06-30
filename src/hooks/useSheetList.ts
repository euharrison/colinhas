import { useContext } from "react";
import { SheetsContext } from "../contexts/SheetsContext";

export const useSheetList = () => {
  const data = useContext(SheetsContext);
  return data.sort((a, b) => b.updatedAt - a.updatedAt);
};
