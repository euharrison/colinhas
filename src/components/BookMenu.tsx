import { forwardRef, useRef } from "react";
import { Platform, Share } from "react-native";
import { auth } from "../auth/auth";
import { Book } from "../database/types";
import { PencilIcon } from "../icons/PencilIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { ResetIcon } from "../icons/ResetIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { shareBookUrl } from "../urls";
import { DeleteBookDialog } from "./DeleteBookDialog";
import { DialogRef, openDialog } from "./Dialog";
import { ListMenu, ListMenuRef } from "./ListMenu";
import { ShareDialog } from "./ShareDialog";

type Props = {
  book: Book;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  onPressAppend: () => void;
};

export const BookMenu = forwardRef<ListMenuRef, Props>(
  ({ book, isEditMode, setIsEditMode, onPressAppend, ...props }, ref) => {
    const shareDialogRef = useRef<DialogRef>(null);
    const deleteDialogRef = useRef<DialogRef>(null);

    const options = [
      {
        label: "Compartilhar",
        icon: <ShareIcon width={16} />,
        onPress: () => {
          if (Platform.OS === "web") {
            openDialog(shareDialogRef);
          } else {
            Share.share({ url: shareBookUrl(book) });
          }
        },
      },
    ];

    const hasEditPermission = book.userId === auth.currentUser?.uid;
    if (hasEditPermission) {
      options.push(
        {
          label: "Adicionar música",
          icon: <PlusIcon width={18} />,
          onPress: onPressAppend,
        },
        isEditMode
          ? {
              label: "Terminar edição",
              icon: <ResetIcon width={18} />,
              onPress: () => {
                setIsEditMode(false);
              },
            }
          : {
              label: "Editar",
              icon: <PencilIcon width={18} />,
              onPress: () => {
                setIsEditMode(true);
              },
            },
        {
          label: "Apagar",
          icon: <TrashIcon width={18} />,
          onPress: () => openDialog(deleteDialogRef),
        },
      );
    }

    return (
      <>
        <ListMenu ref={ref} {...props} options={options} />
        <ShareDialog ref={shareDialogRef} url={shareBookUrl(book)} />
        <DeleteBookDialog ref={deleteDialogRef} book={book} />
      </>
    );
  },
);
