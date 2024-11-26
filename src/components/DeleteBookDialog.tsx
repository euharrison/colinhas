import { forwardRef } from "react";
import { Text } from "react-native";
import { Button } from "../components/Button";
import { Dialog, DialogRef } from "../components/Dialog";
import { deleteBook } from "../database/books";
import { Book } from "../database/types";
import { alert } from "../services/alert";
import { dismissAll } from "../services/navigation";
import { textRed } from "../theme/colors";

type Props = {
  book: Book;
};

export const DeleteBookDialog = forwardRef<DialogRef, Props>(
  ({ book }, ref) => {
    return (
      <Dialog ref={ref} title="Apagar">
        <Text>
          Apagar a lista <Text style={{ fontWeight: "700" }}>{book.name}</Text>?
        </Text>
        <Text style={{ marginTop: 8 }}>
          As músicas dessa lista continuarão a existir, apenas a lista será
          removida.
        </Text>
        <Text style={{ marginTop: 8 }}>Essa ação não poderá ser desfeita!</Text>
        <Button
          style={{ marginTop: 20 }}
          textStyle={{ color: textRed }}
          onPress={() => {
            try {
              deleteBook(book.id);
              dismissAll();
            } catch (error) {
              alert(String(error));
            }
          }}
        >
          Apagar
        </Button>
      </Dialog>
    );
  },
);
