import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { auth } from "../auth/auth";
import { AccidentalInput } from "../components/AccidentalInput";
import { Header } from "../components/Header";
import { NotFound } from "../components/NotFound";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { useInstrument } from "../hooks/useInstrument";
import { useSheet } from "../hooks/useSheet";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { textGray } from "../theme/colors";

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
        <View style={{ marginTop: 8, marginBottom: 16, gap: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: textGray }}>
              Original em {sheet.instrument}{" "}
            </Text>
            <InstrumentIcon
              instrument={sheet.instrument}
              width={18}
              height={18}
              fill={textGray}
            />
          </View>
          {sheet.instrument !== instrument && (
            <View>
              <Text style={{ color: textGray }}>Transposição automática.</Text>
              <AccidentalInput />
            </View>
          )}
        </View>
        <Text style={{ fontSize: 28 }}>{formatSheet(sheet)}</Text>
      </ScrollView>
    </>
  );
};
