import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Platform, Pressable, Share } from "react-native";
import { DeleteSheetDialog } from "../components/DeleteSheetDialog";
import { DialogRef } from "../components/Dialog";
import { EditSheet } from "../components/EditSheet";
import { Header } from "../components/Header";
import { KeyboardLayout } from "../components/KeyboardLayout";
import { LoadingPage } from "../components/LoadingPage";
import { ShareDialog } from "../components/ShareDialog";
import { SheetMenu } from "../components/SheetMenu";
import { ViewSheet } from "../components/ViewSheet";
import { observeSheet } from "../database/sheets";
import { Sheet } from "../database/types";
import { OptionsIcon } from "../icons/OptionsIcons";
import { alert } from "../services/alert";
import { headerHeight, pagePadding } from "../theme/sizes";
import { shareSheetUrl } from "../urls";
import { NotFoundPage } from "./NotFoundPage";

export const SheetPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [sheet, setSheet] = useState<Sheet | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const shareDialogRef = useRef<DialogRef>(null);
  const deleteDialogRef = useRef<DialogRef>(null);

  const params = useLocalSearchParams();
  const id = String(params.sheet);
  useEffect(() => {
    return observeSheet(
      id,
      (data) => {
        setSheet(data);
        setIsLoading(false);
      },
      (error) => alert(error.message),
    );
  }, [id]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!sheet) {
    return <NotFoundPage />;
  }

  return (
    <KeyboardLayout>
      <Header title={sheet.name}>
        <Pressable
          style={{
            height: headerHeight,
            paddingHorizontal: pagePadding,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setIsMenuVisible((v) => !v)}
        >
          <OptionsIcon />
        </Pressable>
      </Header>

      {isEditMode ? <EditSheet sheet={sheet} /> : <ViewSheet sheet={sheet} />}

      <SheetMenu
        sheet={sheet}
        isVisible={isMenuVisible}
        setIsVisible={setIsMenuVisible}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        onPressShare={() => {
          if (Platform.OS === "web") {
            shareDialogRef.current?.open();
          } else {
            Share.share({ url: shareSheetUrl(sheet) });
          }
        }}
        onPressDelete={() => deleteDialogRef.current?.open()}
      />

      <ShareDialog ref={shareDialogRef} sheet={sheet} />
      <DeleteSheetDialog ref={deleteDialogRef} sheet={sheet} />
    </KeyboardLayout>
  );
};
