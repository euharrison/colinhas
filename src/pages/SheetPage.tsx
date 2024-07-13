import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Dialog } from "../components/Dialog";
import { EditSheet } from "../components/EditSheet";
import { Header } from "../components/Header";
import { KeyboardLayout } from "../components/KeyboardLayout";
import { LoadingPage } from "../components/LoadingPage";
import { SheetMenu } from "../components/SheetMenu";
import { ViewSheet } from "../components/ViewSheet";
import { observeSheet } from "../database/sheet";
import { Sheet } from "../database/types";
import { OptionsIcon } from "../icons/OptionsIcons";
import { WhatsappIcon } from "../icons/WhatsappIcon";
import { alert } from "../services/alert";
import { textGray } from "../theme/colors";
import { headerHeight, pagePadding } from "../theme/sizes";
import { shareSheetUrl } from "../urls";
import { NotFoundPage } from "./NotFoundPage";

export const SheetPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isShareVisible, setIsShareVisible] = useState(false);

  const [sheet, setSheet] = useState<Sheet | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsShareVisible={setIsShareVisible}
      />

      <Dialog
        title="Share"
        visible={isShareVisible}
        onRequestClose={() => setIsShareVisible(false)}
      >
        <Text
          selectable
          numberOfLines={1}
          style={{ color: textGray, marginBottom: 16 }}
        >
          {shareSheetUrl(sheet)}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "stretch", gap: 8 }}>
          <Button
            style={{ flex: 1 }}
            onPress={async () => {
              try {
                await navigator.clipboard.writeText(shareSheetUrl(sheet));
                alert("Link copiado");
                setIsShareVisible(false);
              } catch (error) {
                alert(String(error));
              }
            }}
          >
            Copiar Link
          </Button>
          <Link
            href={`https://api.whatsapp.com/send?text=${shareSheetUrl(sheet)}`}
            target="_blank"
          >
            <Button>
              <WhatsappIcon />
            </Button>
          </Link>
        </View>
      </Dialog>
    </KeyboardLayout>
  );
};
