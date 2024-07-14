import { forwardRef } from "react";
import { Text } from "react-native";
import { Button } from "../components/Button";
import { Dialog, DialogRef } from "../components/Dialog";
import { deleteSheet } from "../database/sheets";
import { Sheet } from "../database/types";
import { alert } from "../services/alert";
import { dismissAll } from "../services/navigation";

type Props = {
  sheet: Sheet;
};

export const DeleteSheetDialog = forwardRef<DialogRef, Props>(
  ({ sheet }, ref) => {
    return (
      <Dialog ref={ref} title="Apagar">
        <Text>
          Apagar a cola <Text style={{ fontWeight: "700" }}>{sheet.name}</Text>?
        </Text>
        <Text style={{ marginTop: 8 }}>Essa ação não poderá ser desfeita!</Text>
        <Button
          style={{ marginTop: 20 }}
          onPress={() => {
            try {
              deleteSheet(sheet.id);
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
