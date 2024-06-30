import { ReactNode, useEffect, useState } from "react";
import { Alert } from "react-native";
import { SheetsContext } from "../contexts/SheetsContext";
import { subscribeSheets } from "../database/subscribeSheets";
import { Sheet } from "../database/types";

export const SheetsProvider = ({ children }: { children: ReactNode }) => {
  const [sheets, setSheets] = useState<Sheet[]>([]);

  useEffect(() => {
    const load = async () => {
      return subscribeSheets(
        (sheets) => {
          setSheets(sheets);
        },
        (error) => {
          Alert.alert("Erro ao carregar as colas", error.message);
        },
      );
    };
    load();
  }, []);

  return (
    <SheetsContext.Provider value={sheets}>{children}</SheetsContext.Provider>
  );
};
