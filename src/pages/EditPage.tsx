import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text } from "react-native";
import { auth } from "../auth/auth";
import { Editor } from "../components/Editor";
import { Header } from "../components/Header";
import { KeyboardLayout } from "../components/KeyboardLayout";
import { NotFound } from "../components/NotFound";
import { deleteSheet } from "../database/deleteSheet";
import { useSheet } from "../hooks/useSheet";
import { alert, Alert } from "../services/alert";
import { dismissAll } from "../services/navigation";

export const EditPage = () => {
  const params = useLocalSearchParams();
  const sheet = useSheet(String(params.sheet));

  if (!sheet) {
    return <NotFound />;
  }

  return (
    <KeyboardLayout>
      <Header title={sheet.name}>
        {sheet.userId === auth.currentUser?.uid && (
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
        )}
      </Header>
      <Editor sheet={sheet} />
    </KeyboardLayout>
  );
};
