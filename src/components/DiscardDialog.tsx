import { forwardRef } from "react";
import { Text, View } from "react-native";
import { Button } from "./Button";
import { closeDialog, Dialog, DialogRef } from "./Dialog";
import { textRed } from "../theme/colors";

type Props = {
  onConfirm: () => void;
};

export const DiscardDialog = forwardRef<DialogRef, Props>(
  ({ onConfirm }, ref) => {
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
              closeDialog(ref);
            }}
          >
            Cancelar
          </Button>
          <Button
            style={{ flex: 1 }}
            textStyle={{ color: textRed }}
            onPress={() => {
              onConfirm();
              closeDialog(ref);
            }}
          >
            Descartar
          </Button>
        </View>
      </Dialog>
    );
  },
);
