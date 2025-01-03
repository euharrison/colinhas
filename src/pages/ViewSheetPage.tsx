import { useKeepAwake } from "expo-keep-awake";
import { Link, useLocalSearchParams } from "expo-router";
import { ReactNode, useRef, useState } from "react";
import { Text, View } from "react-native";
import reactStringReplace from "react-string-replace";
import { DialogRef, openDialog } from "../components/Dialog";
import { Header } from "../components/Header";
import { HeaderMenu } from "../components/HeaderMenu";
import { InstrumentDialog } from "../components/InstrumentDialog";
import { ListMenuRef } from "../components/ListMenu";
import { LoadingPage } from "../components/LoadingPage";
import { OgTags } from "../components/OgTags";
import { PdfViewer } from "../components/PdfViewer";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { SheetScrollView } from "../components/SheetScrollView";
import { ViewSheetMenu } from "../components/ViewSheetMenu";
import { XmlViewer } from "../components/XmlViewer";
import { useFormatKey } from "../hooks/useFormatKey";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { useQuerySheet } from "../hooks/useQuerySheet";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { getInstrumentOffset } from "../services/getInstrumentOffset";
import { black, blue, textGray } from "../theme/colors";
import { pagePadding } from "../theme/sizes";
import { getExtensionFromUrl } from "../utils";
import { NotFoundPage } from "./NotFoundPage";

type ElementToFormat = string | ReactNode[] | undefined;

const formatLyrics = (element: ElementToFormat): ElementToFormat =>
  reactStringReplace(element, /["|http](.*?)"/g, (text, i) => (
    <Text key={`lyrics_${text}_${i}`} style={{ fontSize: 16, color: textGray }}>
      {text}
    </Text>
  ));

const formatUrls = (element: ElementToFormat): ElementToFormat =>
  reactStringReplace(element, /(http.*)/g, (url, i, offset) => {
    const key = `url_${url}_${i}_${offset}`;
    const extension = getExtensionFromUrl(url);
    if (extension === ".pdf") {
      return <PdfViewer key={key} url={url} />;
    }
    if (extension === ".mxl") {
      return <XmlViewer key={key} url={url} />;
    }
    if (extension === ".png" || extension === ".jpg") {
      return (
        <View key={key} style={{ marginHorizontal: -pagePadding }}>
          <ResponsiveImage source={url} />
        </View>
      );
    }
    return (
      <Link key={key} href={url} target="_blank" rel="noreferrer">
        <Text style={{ fontSize: 14, color: blue }}>{url}</Text>
      </Link>
    );
  });

export const ViewSheetPage = () => {
  const params = useLocalSearchParams();
  const id = String(params.id);

  const { data, isLoading } = useQuerySheet(id);

  const formatSheet = useFormatSheet();
  const formatKey = useFormatKey();
  const { settings } = useLocalSettings();
  const [instrument, setInstrument] = useState(settings.instrument);

  const listMenuRef = useRef<ListMenuRef>(null);
  const instrumentDialogRef = useRef<DialogRef>(null);

  useKeepAwake();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!data) {
    return <NotFoundPage />;
  }

  const needsAutoTransposition =
    getInstrumentOffset(instrument) !== getInstrumentOffset(data.instrument);

  return (
    <>
      <OgTags title={data.name} />

      <SheetScrollView>
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
              Escrito para {data.instrument}
            </Text>
            <InstrumentIcon
              instrument={data.instrument}
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
                <Text
                  style={{ textDecorationLine: "underline" }}
                  onPress={() => {
                    openDialog(instrumentDialogRef);
                  }}
                >
                  {instrument}
                </Text>
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
            Tom: {formatKey(data, instrument) ?? "Desconhecido"}
          </Text>
        </View>

        <View style={{ paddingHorizontal: pagePadding, paddingBottom: 100 }}>
          <Text style={{ fontSize: 20, fontWeight: "500", color: black }}>
            {formatUrls(formatLyrics(formatSheet(data, instrument)))}
          </Text>
        </View>
      </SheetScrollView>

      <InstrumentDialog
        ref={instrumentDialogRef}
        selectedItem={instrument}
        onSelect={(i) => setInstrument(i)}
      />
    </>
  );
};
