import { Link } from "expo-router";
import { ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import reactStringReplace from "react-string-replace";
import { Sheet } from "../database/types";
import { useFormatKey } from "../hooks/useFormatKey";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { black, blue, darkBlue, textGray } from "../theme/colors";

const formatLyrics = (element: ReactNode): ReactNode[] =>
  typeof element !== "string"
    ? [element]
    : reactStringReplace(element, /["|http](.*?)"/g, (match, i) => (
        <Text key={i} style={{ fontSize: 16, color: textGray }}>
          {match}
        </Text>
      ));

const formatUrls = (element: ReactNode): ReactNode[] =>
  typeof element !== "string"
    ? [element]
    : reactStringReplace(element, /(http.*)/g, (match, i) => (
        <Link key={i} href={match} target="_blank" rel="noreferrer" asChild>
          <Pressable>
            {({ pressed }) => (
              <Text style={{ fontSize: 14, color: pressed ? darkBlue : blue }}>
                {match}
              </Text>
            )}
          </Pressable>
        </Link>
      ));

export const ViewSheet = ({ sheet }: { sheet: Sheet }) => {
  const { settings } = useLocalSettings();
  const formatSheet = useFormatSheet();
  const formatKey = useFormatKey();

  const viewKey = formatKey(sheet);
  const isDifferentKey = viewKey && viewKey !== sheet.key;

  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
    >
      <View style={{ marginTop: 8, marginBottom: 20, gap: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text style={{ color: textGray }}>
            Escrito para {sheet.instrument}
          </Text>
          <InstrumentIcon
            instrument={sheet.instrument}
            width={18}
            height={18}
            fill={textGray}
          />
        </View>

        {isDifferentKey && (
          <View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text style={{ color: textGray }}>
                Transposto automaticamente para {settings.instrument}
              </Text>
              <InstrumentIcon
                instrument={settings.instrument}
                width={18}
                height={18}
                fill={textGray}
              />
            </View>
          </View>
        )}

        <Text style={{ color: textGray }}>
          Tom: {viewKey ?? "Desconhecido"}
        </Text>
      </View>
      <Text style={{ fontSize: 20, fontWeight: "500", color: black }}>
        {formatLyrics(formatSheet(sheet)).map(formatUrls)}
      </Text>
    </ScrollView>
  );
};
