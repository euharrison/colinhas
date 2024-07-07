import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import { auth } from "../auth/auth";
import { EditSheet } from "../components/EditSheet";
import { Header } from "../components/Header";
import { KeyboardLayout } from "../components/KeyboardLayout";
import { NotFound } from "../components/NotFound";
import { ViewSheet } from "../components/ViewSheet";
import { deleteSheet } from "../database/deleteSheet";
import { observeSheet } from "../database/sheet";
import { Sheet } from "../database/types";
import { alert } from "../services/alert";
import { dismissAll } from "../services/navigation";

export const ViewPage = () => {
  const params = useLocalSearchParams();

  const [isEditMode, setIsEditMode] = useState(false);
  const [sheet, setSheet] = useState<Sheet | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

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
        {sheet.userId === auth.currentUser?.uid &&
          (isEditMode ? (
            <Pressable
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
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
                );
              }}
            >
              <Text>❌</Text>
            </Pressable>
          ) : (
            <Pressable
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setIsEditMode((v) => !v);
              }}
            >
              <Text>✏️</Text>
            </Pressable>
          ))}
      </Header>
      {isEditMode ? <EditSheet sheet={sheet} /> : <ViewSheet sheet={sheet} />}
    </KeyboardLayout>
  );
};
