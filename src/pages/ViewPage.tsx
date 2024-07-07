import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { auth } from "../auth/auth";
import { AccidentalInput } from "../components/AccidentalInput";
import { Header } from "../components/Header";
import { NotFound } from "../components/NotFound";
import { observeSheet } from "../database/sheet";
import { Sheet } from "../database/types";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { useInstrument } from "../hooks/useInstrument";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { alert } from "../services/alert";
import { textGray } from "../theme/colors";

export const ViewPage = () => {
  const params = useLocalSearchParams();
  const instrument = useInstrument();
  const formatSheet = useFormatSheet();

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
              Escrito para {sheet.instrument}{" "}
            </Text>
            <InstrumentIcon
              instrument={sheet.instrument}
              width={18}
              height={18}
              fill={textGray}
            />
          </View>
          <Text style={{ color: textGray }}>Tom: {sheet.keySignature}</Text>
          {sheet.instrument !== instrument && (
            <View>
              <Text style={{ color: textGray }}>Transposição automática.</Text>
              <AccidentalInput />
            </View>
          )}
        </View>
        <Text style={{ fontSize: 20 }}>{formatSheet(sheet)}</Text>
      </ScrollView>
    </>
  );
};
