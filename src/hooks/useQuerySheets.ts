import { useEffect, useState } from "react";
import { observeSheetCollection } from "../database/sheets";
import { Sheet } from "../database/types";
import { alert } from "../services/alert";

export const useQuerySheets = () => {
  const [data, setData] = useState<Sheet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return observeSheetCollection(
      (data) => {
        setData(data.sort((a, b) => b.createdAt - a.createdAt));
        setIsLoading(false);
      },
      (error) => alert(error.message),
    );
  }, []);

  return { data, isLoading };
};
