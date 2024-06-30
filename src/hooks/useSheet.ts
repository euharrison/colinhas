import { useContext } from "react";
import { SheetsContext } from "../contexts/SheetsContext";

export const useSheet = (id: string) => {
  const data = useContext(SheetsContext);
  return data.find((item) => item.id === id);
};
