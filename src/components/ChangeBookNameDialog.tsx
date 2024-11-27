import { forwardRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { changeBookName } from "../database/books";
import { Book } from "../database/types";
import { alert } from "../services/alert";
import { borderGray } from "../theme/colors";
import { Button } from "./Button";
import { closeDialog, Dialog, DialogRef } from "./Dialog";

type Props = {
  book: Book;
};

export const ChangeBookNameDialog = forwardRef<DialogRef, Props>(
  ({ book }, ref) => {
    const [name, setName] = useState(book.name);

    return (
      <Dialog ref={ref} title="Renomear">
        <View style={{ gap: 16 }}>
          <View>
            <Text>Nome:</Text>
            <TextInput
              style={{
                padding: 8,
                borderWidth: 1,
                borderColor: borderGray,
                borderRadius: 8,
              }}
              autoComplete="off"
              autoCorrect={false}
              autoFocus
              value={name}
              onChangeText={setName}
            />
          </View>
          <Button
            onPress={async () => {
              try {
                if (!name) {
                  throw new Error("Dê um nome para sua lista");
                }
                changeBookName(book.id, name);
                closeDialog(ref);
              } catch (error) {
                alert(String(error));
              }
            }}
          >
            Salvar
          </Button>
        </View>
      </Dialog>
    );
  },
);
