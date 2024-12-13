import { useKeepAwake } from "expo-keep-awake";
import { Link } from "expo-router";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import reactStringReplace from "react-string-replace";
import { Sheet } from "../database/types";
import { useFormatKey } from "../hooks/useFormatKey";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { PauseIcon } from "../icons/PauseIcon";
import { PlayIcon } from "../icons/PlayIcon";
import { getInstrumentOffset } from "../services/getInstrumentOffset";
import { black, blue, darkBlue, textGray } from "../theme/colors";
import { DialogRef } from "./Dialog";
import { FAB } from "./FAB";
import { InstrumentDialog } from "./InstrumentDialog";
import { XmlViewer } from "./XmlViewer";

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
    : reactStringReplace(element, /(http.*)/g, (match, i) => {
        if (match.includes(".mxl")) {
          return <XmlViewer key={i} url={match} />;
        }
        return (
          <Link key={i} href={match} target="_blank" rel="noreferrer" asChild>
            <Pressable>
              {({ pressed }) => (
                <Text
                  style={{ fontSize: 14, color: pressed ? darkBlue : blue }}
                >
                  {match}
                </Text>
              )}
            </Pressable>
          </Link>
        );
      });

const defaultAutoScrollPx = 100;
const defaultAutoScrollTick = 10;

export const ViewSheet = ({ sheet }: { sheet: Sheet }) => {
  const formatSheet = useFormatSheet();
  const formatKey = useFormatKey();
  const { settings } = useLocalSettings();
  const [instrument, setInstrument] = useState(settings.instrument);
  const [isPlayMode, setIsPlayMode] = useState(false);

  const instrumentDialogRef = useRef<DialogRef>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollPosRef = useRef<number>(0);

  useKeepAwake();

  const needsAutoTransposition =
    getInstrumentOffset(instrument) !== getInstrumentOffset(sheet.instrument);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayMode) {
      interval = setInterval(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            y: scrollPosRef.current + defaultAutoScrollPx,
            animated: true,
          });
        }
      }, defaultAutoScrollTick * 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlayMode]);

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        onScroll={(e) => {
          scrollPosRef.current = e.nativeEvent.contentOffset.y;
        }}
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

      <FAB
        onPress={() => setIsPlayMode((v) => !v)}
        style={{ opacity: isPlayMode ? 0.2 : undefined }}
      >
        {isPlayMode ? <PauseIcon height={16} /> : <PlayIcon height={16} />}
      </FAB>

      <InstrumentDialog
        ref={instrumentDialogRef}
        selectedItem={instrument}
        onSelect={(i) => setInstrument(i)}
      />
    </>
  );
};
