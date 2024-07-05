import { ReactNode, useEffect, useState } from "react";
import { SheetsContext } from "../contexts/SheetsContext";
import { subscribeSheets } from "../database/subscribeSheets";
import { Sheet } from "../database/types";
import { alert } from "../services/alert";

export const SheetsProvider = ({ children }: { children: ReactNode }) => {
  const [sheets, setSheets] = useState<Sheet[]>([]);

  useEffect(() => {
    const load = async () => {
      return subscribeSheets(
        (sheets) => {
          setSheets(sheets);
        },
        (error) => {
          alert("Erro ao carregar as colas", error.message);
        },
      );
    };
    load();
  }, []);

  return (
    <SheetsContext.Provider value={sheets}>{children}</SheetsContext.Provider>
  );
};
