import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";
import { Header } from "../components/Header";
import { NotFound } from "../components/NotFound";
import { useSheet } from "../hooks/useSheet";
import { auth } from "../services/auth";

export const ViewPage = () => {
  const params = useLocalSearchParams();
  const sheet = useSheet(String(params.sheet));

  if (!sheet) {
    return <NotFound />;
  }

  return (
    <>
      <Header title={sheet.name}>
        {sheet.userId === auth.currentUser?.uid && (
          <Link href={`/${sheet.id}/edit`} asChild>
            <Pressable
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>✏️</Text>
            </Pressable>
          </Link>
        )}
      </Header>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      >
        <Text style={{ fontSize: 20 }}>{sheet.data}</Text>
      </ScrollView>
    </>
  );
};
