import { ReactNode, useEffect, useState } from "react";
import { Alert } from "react-native";
import { DataContext, DataValue } from "../database/context";
import { getSheets } from "../database/getSheets";

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [sheets, setSheets] = useState<DataValue>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setSheets(await getSheets());
      } catch (error) {
        Alert.alert("Erro ao carregar os dados", String(error));
      }
    };
    load();
  }, []);

  return <DataContext.Provider value={sheets}>{children}</DataContext.Provider>;
};
