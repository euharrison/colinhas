import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { auth } from "../auth/auth";
import { EditSheet } from "../components/EditSheet";
import { Header } from "../components/Header";
import { KeyboardLayout } from "../components/KeyboardLayout";
import { NotFound } from "../components/NotFound";
import { ViewSheet } from "../components/ViewSheet";
import { deleteSheet } from "../database/deleteSheet";
import { observeSheet } from "../database/sheet";
import { Sheet } from "../database/types";
import { OptionsIcon } from "../icons/OptionsIcons";
import { PencilIcon } from "../icons/PencilIcon";
import { ResetIcon } from "../icons/ResetIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { alert } from "../services/alert";
import { dismissAll } from "../services/navigation";
import { black, buttonFeedback, white } from "../theme/colors";
import { dropShadow } from "../theme/shadows";
import { headerHeight, pagePadding } from "../theme/sizes";

export const SheetPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOptionsVisible, setIsOptionVisible] = useState(false);

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
    return <Text>Loading...</Text>;
  }

  if (!sheet) {
    return <NotFound />;
  }

  return (
    <KeyboardLayout>
      <Header title={sheet.name}>
        {sheet.userId === auth.currentUser?.uid && (
          <Pressable
            style={{
              height: headerHeight,
              paddingHorizontal: pagePadding,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setIsOptionVisible((v) => !v)}
          >
            <OptionsIcon />
          </Pressable>
        )}
      </Header>

      {isEditMode ? <EditSheet sheet={sheet} /> : <ViewSheet sheet={sheet} />}

      {isOptionsVisible && (
        <View
          style={{
            position: "absolute",
            right: 0,
            top: headerHeight,
            width: 200,
            borderWidth: 1,
            borderColor: black,
            borderRadius: 8,
            paddingVertical: 8,
            ...dropShadow,
          }}
        >
          {[
            isEditMode
              ? {
                  label: "Cancelar edição",
                  icon: <ResetIcon width={18} />,
                  onPress: () => setIsEditMode(false),
                }
              : {
                  label: "Editar",
                  icon: <PencilIcon width={18} />,
                  onPress: () => setIsEditMode(true),
                },
            {
              label: "Apagar",
              icon: <TrashIcon width={18} />,
              onPress: () =>
                alert(
                  `Apagar a cola ${sheet.name}?`,
                  "Essa ação não poderá ser desfeita",
                  async () => {
                    try {
                      await deleteSheet(sheet.id);
                      dismissAll();
                    } catch (error) {
                      alert(String(error));
                    }
                  },
                ),
            },
          ].map(({ label, icon, onPress }) => (
            <Pressable
              key={label}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                paddingHorizontal: 20,
                paddingVertical: 8,
                backgroundColor: pressed ? buttonFeedback : white,
              })}
              onPress={() => {
                onPress();
                setIsOptionVisible(false);
              }}
            >
              <View>{icon}</View>
              <Text style={{ fontSize: 16 }}>{label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </KeyboardLayout>
  );
};
