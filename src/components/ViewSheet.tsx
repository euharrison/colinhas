import { Link } from "expo-router";
import { ReactNode, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import reactStringReplace from "react-string-replace";
import { Key, Sheet } from "../database/types";
import { useFormatKey } from "../hooks/useFormatKey";
import { useFormatSheet, useFormatSheet2 } from "../hooks/useFormatSheet";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import {
  backgroundGray,
  black,
  blue,
  borderGray,
  darkBlue,
  textGray,
  white,
} from "../theme/colors";
import { Button } from "./Button";
import { getKeySignature } from "../utils";
import { transposeKey } from "../services/transposeKey";
import { KeySelector } from "./KeySelector";
import { transpose } from "../services/transpose";

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

// TODO parei aqui, tenho q entender como fazer essa sequencia em diferentes cenarios
// - quando aperta o botao de menos (-)
// - quando aperta o botao de mais (+)
// - quando aperta está na escala Maior
// - quando aperta está na escala menor

const majorKeyLowOrder = [
  ["Do♭ Maior", "La♭ menor", -1],
  ["Do Maior", "La menor", 0],

  ["Re♭ Maior", "Si♭ menor", +1],
  // ["Do♯ Maior", "La♯ menor", +1],

  ["Re Maior", "Si menor", +2],
  ["Mi♭ Maior", "Do menor", +3],
  ["Mi Maior", "Do♯ menor", +4],
  ["Fa Maior", "Re menor", +5],

  ["Fa♯ Maior", "Re♯ menor", +6],
  // ["Sol♭ Maior", "Mi♭ menor", +6],

  ["Sol Maior", "Mi menor", -5],
  ["La♭ Maior", "Fa menor", -4],
  ["La Maior", "Fa♯ menor", -3],
  ["Si♭ Maior", "Sol menor", -2],
  ["Si Maior", "Sol♯ menor", -1],
];

const keyIncrementOrder = [
  ["Do♭ Maior", "La♭ menor", -1],
  ["Do Maior", "La menor", 0],

  ["Re♭ Maior", "Si♭ menor", +1],
  // ["Do♯ Maior", "La♯ menor", +1],

  ["Re Maior", "Si menor", +2],
  ["Mi♭ Maior", "Do menor", +3],
  ["Mi Maior", "Do♯ menor", +4],
  ["Fa Maior", "Re menor", +5],

  ["Fa♯ Maior", "Re♯ menor", +6],
  // ["Sol♭ Maior", "Mi♭ menor", +6],

  ["Sol Maior", "Mi menor", -5],
  ["La♭ Maior", "Fa menor", -4],
  ["La Maior", "Fa♯ menor", -3],
  ["Si♭ Maior", "Sol menor", -2],
  ["Si Maior", "Sol♯ menor", -1],
];

export const ViewSheet = ({ sheet }: { sheet: Sheet }) => {
  const { settings } = useLocalSettings();
  const formatSheet = useFormatSheet();
  const formatSheet2 = useFormatSheet2();
  const formatKey = useFormatKey();

  const [key, setKey] = useState(formatKey(sheet));
  const [offset, setOffset] = useState(0);

  const isDifferentKey = formatKey(sheet) !== sheet.key;
  const keySignature = getKeySignature(key);

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

        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text style={{ color: textGray }}>Tom:</Text>
          <KeySelector
            style={({ pressed }) => [
              {
                borderWidth: 1,
                borderColor: borderGray,
                paddingVertical: 8,
                width: 160,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: pressed ? backgroundGray : white,
              },
            ]}
            onChange={(value) => setKey(value)}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                textTransform: "uppercase",
                textAlign: "center",
                userSelect: "none",
              }}
            >
              {key}
              {keySignature !== " " && (
                <Text style={{ marginLeft: 8, color: textGray }}>
                  {keySignature}
                </Text>
              )}
            </Text>
          </KeySelector>
          <Button
            style={{ paddingVertical: 8 }}
            onPress={() => setOffset((v) => v - 1)}
          >
            -
          </Button>
          <Text style={{ padding: 8, color: textGray }}>{offset}</Text>
          <Button
            style={{ paddingVertical: 8 }}
            onPress={() => setOffset((v) => v + 1)}
          >
            +
          </Button>
        </View>
      </View>
      <Text style={{ fontSize: 20, fontWeight: "500", color: black }}>
        {formatLyrics(formatSheet(sheet)).map(formatUrls)}
        {"\n"}
        {"\n"}
        {"\n"}
        {formatLyrics(transpose(sheet.data, offset, "sharp")).map(formatUrls)}
        {"\n"}
        {"\n"}
        {"\n"}
        {formatLyrics(formatSheet2(sheet, +1)).map(formatUrls)}
      </Text>
    </ScrollView>
  );
};
