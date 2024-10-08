import { forwardRef } from "react";
import { Text, View } from "react-native";
import { Button } from "./Button";
import { Dialog, DialogRef } from "./Dialog";
import { textRed } from "../theme/colors";

type Props = {
  onConfirm: () => void;
};

export const DiscardDialog = forwardRef<DialogRef, Props>(
  ({ onConfirm }, ref) => {
    const close = () => {
      if (ref && "current" in ref) {
        ref?.current?.close();
      }
    };

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
              close();
            }}
          >
            Cancelar
          </Button>
          <Button
            style={{ flex: 1 }}
            textStyle={{ color: textRed }}
            onPress={() => {
              onConfirm();
              close();
            }}
          >
            Descartar
          </Button>
        </View>
      </Dialog>
    );
  },
);
