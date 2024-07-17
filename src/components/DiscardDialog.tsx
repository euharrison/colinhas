import { forwardRef } from "react";
import { Text, View } from "react-native";
import { goBack } from "../services/navigation";
import { Button } from "./Button";
import { Dialog, DialogRef } from "./Dialog";

export const DiscardDialog = forwardRef<DialogRef, {}>((_, ref) => {
  return (
    <Dialog ref={ref} title="Descartar">
      <View style={{ marginBottom: 20, gap: 8 }}>
        <Text>Tem certeza que deseja descartar a edição atual?</Text>
        <Text>Essa ação não poderá ser desfeita</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "stretch", gap: 8 }}>
        <Button
          style={{ flex: 1 }}
          onPress={() => {
            if (ref && "current" in ref) {
              ref?.current?.close();
            }
          }}
        >
          Cancelar
        </Button>
        <Button
          style={{ flex: 1 }}
          onPress={() => {
            goBack();
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              textTransform: "uppercase",
              color: "red",
            }}
          >
            Descartar
          </Text>
        </Button>
      </View>
    </Dialog>
  );
});
