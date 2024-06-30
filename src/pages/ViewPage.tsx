import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";
import { auth } from "../auth/auth";
import { Header } from "../components/Header";
import { NotFound } from "../components/NotFound";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { useInstrument } from "../hooks/useInstrument";
import { useSheet } from "../hooks/useSheet";

export const ViewPage = () => {
  const params = useLocalSearchParams();
  const sheet = useSheet(String(params.sheet));
  const instrument = useInstrument();
  const formatSheet = useFormatSheet();

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
        {sheet.instrument !== instrument && (
          <Text style={{ color: "#999", marginTop: 8, marginBottom: 16 }}>
            Transposição automática. Original em {sheet.instrument}
          </Text>
        )}
        <Text style={{ fontSize: 20 }}>{formatSheet(sheet)}</Text>
      </ScrollView>
    </>
  );
};
