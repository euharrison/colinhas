import { Link } from "expo-router";
import { ReactNode, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import reactStringReplace from "react-string-replace";
import { Sheet } from "../database/types";
import { useFormatKey } from "../hooks/useFormatKey";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { getInstrumentOffset } from "../services/getInstrumentOffset";
import { black, blue, darkBlue, textGray } from "../theme/colors";
import { DialogRef } from "./Dialog";
import { InstrumentDialog } from "./InstrumentDialog";

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
  const formatSheet = useFormatSheet();
  const formatKey = useFormatKey();
  const { settings } = useLocalSettings();
  const [instrument, setInstrument] = useState(settings.instrument);

  const instrumentDialogRef = useRef<DialogRef>(null);

  const needsAutoTransposition =
    getInstrumentOffset(instrument) !== getInstrumentOffset(sheet.instrument);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      >
        <View style={{ marginTop: 8, marginBottom: 20, gap: 8 }}>
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

          <View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text style={{ color: textGray }}>
                Visualizando para{" "}
                <Pressable
                  onPress={() => {
                    instrumentDialogRef.current?.open();
                  }}
                >
                  <Text style={{ textDecorationLine: "underline" }}>
                    {instrument}
                  </Text>
                </Pressable>
              </Text>
              <InstrumentIcon
                instrument={instrument}
                width={18}
                height={18}
                fill={textGray}
              />
            </View>
            {needsAutoTransposition && (
              <Text style={{ color: textGray }}>
                (transposto automaticamente)
              </Text>
            )}
          </View>

          <Text style={{ color: textGray }}>
            Tom: {formatKey(sheet, instrument) ?? "Desconhecido"}
          </Text>
        </View>

        <Text style={{ fontSize: 20, fontWeight: "500", color: black }}>
          {formatLyrics(formatSheet(sheet, instrument)).map(formatUrls)}
        </Text>
      </ScrollView>

      <InstrumentDialog
        ref={instrumentDialogRef}
        selectedItem={instrument}
        onSelect={(i) => setInstrument(i)}
      />
    </>
  );
};
