import { forwardRef, useRef } from "react";
import { Sheet } from "../database/types";
import { TrashIcon } from "../icons/TrashIcon";
import { DeleteSheetDialog } from "./DeleteSheetDialog";
import { DialogRef, openDialog } from "./Dialog";
import { ListMenu, ListMenuRef } from "./ListMenu";

type Props = {
  sheet: Sheet;
};

export const UpdateSheetMenu = forwardRef<ListMenuRef, Props>(
  ({ sheet, ...props }, ref) => {
    const deleteDialogRef = useRef<DialogRef>(null);

    const options = [
      {
        label: "Apagar",
        icon: <TrashIcon width={18} />,
        onPress: () => openDialog(deleteDialogRef),
      },
    ];

    return (
      <>
        <ListMenu ref={ref} {...props} options={options} />
        <DeleteSheetDialog ref={deleteDialogRef} sheet={sheet} />
      </>
    );
  },
);
