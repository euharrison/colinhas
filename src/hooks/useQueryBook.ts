import { useEffect, useState } from "react";
import { observeBook } from "../database/books";
import { Book } from "../database/types";
import { alert } from "../services/alert";

export const useQueryBook = (id: string) => {
  const [data, setData] = useState<Book>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return observeBook(
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
