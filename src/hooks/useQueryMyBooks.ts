import { useEffect, useState } from "react";
import { auth } from "../auth/auth";
import { observeBookCollection } from "../database/books";
import { Book } from "../database/types";
import { alert } from "../services/alert";

export const useQueryMyBooks = () => {
  const [data, setData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return observeBookCollection(
      (data) => {
        setData(
          data
            .filter((i) => i.userId === auth.currentUser?.uid)
            .sort((a, b) => a.createdAt - b.createdAt),
        );
        setIsLoading(false);
      },
      (error) => alert(error.message),
    );
  }, []);

  return { data, isLoading };
};
