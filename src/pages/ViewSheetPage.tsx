import { useKeepAwake } from "expo-keep-awake";
import { Link, useLocalSearchParams } from "expo-router";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import reactStringReplace from "react-string-replace";
import { DialogRef } from "../components/Dialog";
import { FAB } from "../components/FAB";
import { Header } from "../components/Header";
import { HeaderMenu } from "../components/HeaderMenu";
import { InstrumentDialog } from "../components/InstrumentDialog";
import { ListMenuRef } from "../components/ListMenu";
import { LoadingPage } from "../components/LoadingPage";
import { OgTags } from "../components/OgTags";
import { ViewSheetMenu } from "../components/ViewSheetMenu";
import { XmlViewer } from "../components/XmlViewer";
import { useFormatKey } from "../hooks/useFormatKey";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { useQuerySheet } from "../hooks/useQuerySheet";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { PauseIcon } from "../icons/PauseIcon";
import { PlayIcon } from "../icons/PlayIcon";
import { getInstrumentOffset } from "../services/getInstrumentOffset";
import { black, blue, darkBlue, textGray } from "../theme/colors";
import { pagePadding } from "../theme/sizes";
import { NotFoundPage } from "./NotFoundPage";

const defaultAutoScrollPx = 100;
const defaultAutoScrollTick = 10;

const formatLyrics = (element: ReactNode): ReactNode[] =>
  typeof element !== "string"
    ? [element]
    : reactStringReplace(element, /["|http](.*?)"/g, (match, i) => (
        <Text key={`lyrics_${i}`} style={{ fontSize: 16, color: textGray }}>
          {match}
        </Text>
      ));

const formatUrls = (element: ReactNode): ReactNode[] =>
  typeof element !== "string"
    ? [element]
    : reactStringReplace(element, /(http.*)/g, (match, i) => {
        const key = `url_${i}`;
        if (match.includes(".mxl")) {
          return <XmlViewer key={key} url={match} />;
        }
        return (
          <Link key={key} href={match} target="_blank" rel="noreferrer" asChild>
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

const formatNotes = (element: ReactNode, i: number): ReactNode[] =>
  typeof element !== "string"
    ? [element]
    : [
        <Text
          key={`note_${i}`}
          style={{ fontSize: 20, fontWeight: "500", color: black }}
        >
          {element}
        </Text>,
      ];

export const ViewSheetPage = () => {
  const params = useLocalSearchParams();
  const id = String(params.id);

  const { data, isLoading } = useQuerySheet(id);

  const formatSheet = useFormatSheet();
  const formatKey = useFormatKey();
  const { settings } = useLocalSettings();
  const [instrument, setInstrument] = useState(settings.instrument);
  const [isPlayMode, setIsPlayMode] = useState(false);

  const listMenuRef = useRef<ListMenuRef>(null);
  const instrumentDialogRef = useRef<DialogRef>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollPosRef = useRef<number>(0);

  useKeepAwake();

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

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!data) {
    return <NotFoundPage />;
  }

  const sheet = data;

  const needsAutoTransposition =
    getInstrumentOffset(instrument) !== getInstrumentOffset(sheet.instrument);

  return (
    <>
      <OgTags title={data.name} />

      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        onScroll={(e) => {
          scrollPosRef.current = e.nativeEvent.contentOffset.y;
        }}
      >
        <Header title={data.name}>
          <HeaderMenu listMenuRef={listMenuRef} />
          <ViewSheetMenu ref={listMenuRef} sheet={data} />
        </Header>

        <View
          style={{
            paddingHorizontal: pagePadding,
            marginTop: 8,
            marginBottom: 20,
            gap: 8,
          }}
        >
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

        <View style={{ paddingHorizontal: pagePadding, paddingBottom: 100 }}>
          {[formatSheet(sheet, instrument)]
            .map(formatLyrics)
            .flat()
            .map(formatUrls)
            .flat()
            .map(formatNotes)
            .flat()}
        </View>
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
