import { ReactNode, useEffect, useState } from "react";
import { Alert } from "react-native";
import { DataContext, DataValue } from "../database/context";
import { subscribeSheets } from "../database/subscribeSheets";

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [sheets, setSheets] = useState<DataValue>([]);

  useEffect(() => {
    const load = async () => {
      return subscribeSheets(
        (sheets) => {
          setSheets(sheets);
        },
        (error) => {
          Alert.alert("Erro ao carregar os dados", error.message);
        },
      );
    };
    load();
  }, []);

  return <DataContext.Provider value={sheets}>{children}</DataContext.Provider>;
};
