import { router } from "expo-router";
import { forwardRef, useRef } from "react";
import { Platform, Share } from "react-native";
import { auth } from "../auth/auth";
import { Sheet } from "../database/types";
import { PencilIcon } from "../icons/PencilIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { shareSheetUrl, updateSheetUrl } from "../urls";
import { DialogRef, openDialog } from "./Dialog";
import { ListMenu, ListMenuRef } from "./ListMenu";
import { ShareDialog } from "./ShareDialog";

type Props = {
  sheet: Sheet;
};

export const ViewSheetMenu = forwardRef<ListMenuRef, Props>(
  ({ sheet, ...props }, ref) => {
    const shareDialogRef = useRef<DialogRef>(null);

    const options = [
      {
        label: "Compartilhar",
        icon: <ShareIcon width={16} />,
        onPress: () => {
          if (Platform.OS === "web") {
            openDialog(shareDialogRef);
          } else {
            Share.share({ url: shareSheetUrl(sheet) });
          }
        },
      },
    ];

    const hasEditPermission = sheet.userId === auth.currentUser?.uid;
    if (hasEditPermission) {
      options.push({
        label: "Editar",
        icon: <PencilIcon width={18} />,
        onPress: () => {
          router.push(updateSheetUrl(sheet));
        },
      });
    }

    return (
      <>
        <ListMenu ref={ref} {...props} options={options} />
        <ShareDialog ref={shareDialogRef} url={shareSheetUrl(sheet)} />
      </>
    );
  },
);
