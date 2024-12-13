import { useEffect, useState } from "react";
import { observeSheet } from "../database/sheets";
import { Sheet } from "../database/types";
import { alert } from "../services/alert";

export const useQuerySheet = (id: string) => {
  const [data, setData] = useState<Sheet>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return observeSheet(
      id,
      (data) => {
        setData(data);
        setIsLoading(false);
      },
      (error) => alert(error.message),
    );
  }, [id]);

  return { data, isLoading };
};
