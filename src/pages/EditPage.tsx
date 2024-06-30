import { router, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, Text } from "react-native";
import { auth } from "../auth/auth";
import { Editor } from "../components/Editor";
import { Header } from "../components/Header";
import { NotFound } from "../components/NotFound";
import { deleteSheet } from "../database/deleteSheet";
import { useSheet } from "../hooks/useSheet";

export const EditPage = () => {
  const params = useLocalSearchParams();
  const sheet = useSheet(String(params.sheet));

  if (!sheet) {
    return <NotFound />;
  }

  return (
    <>
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
              Alert.alert(
                `Apagar a cola ${sheet.name}?`,
                "Essa ação não poderá ser desfeita",
                [
                  {
                    text: "Cancelar",
                    style: "cancel",
                  },
                  {
                    text: "Apagar",
                    onPress: async () => {
                      try {
                        await deleteSheet(sheet.id);
                        router.dismissAll();
                      } catch (error) {
                        Alert.alert(String(error));
                      }
                    },
                    style: "destructive",
                  },
                ],
                { cancelable: true },
              );
            }}
          >
            <Text>❌</Text>
          </Pressable>
        )}
      </Header>
      <Editor sheet={sheet} />
    </>
  );
};
