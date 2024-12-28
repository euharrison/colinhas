import { router } from "expo-router";
import { forwardRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { createBook } from "../database/books";
import { alert } from "../services/alert";
import { borderGray } from "../theme/colors";
import { bookUrl } from "../urls";
import { Button } from "./Button";
import { closeDialog, Dialog, DialogRef } from "./Dialog";
import { Disclaimer } from "./Disclaimer";

export const CreateBookDialog = forwardRef<DialogRef, object>((props, ref) => {
  const [name, setName] = useState("");

  return (
    <Dialog ref={ref} title="Nova lista">
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
        <Disclaimer>
          Diferente das colas, as listas só são visíveis para outras pessoas se
          elas possuirem o link de compartilhamento.
        </Disclaimer>
        <Button
          onPress={async () => {
            try {
              if (!name) {
                throw new Error("Dê um nome para sua lista");
              }
              const bookId = createBook(name);
              closeDialog(ref);
              router.push(bookUrl({ id: bookId, name }));
              setName("");
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
});
