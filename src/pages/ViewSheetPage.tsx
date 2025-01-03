import { useKeepAwake } from "expo-keep-awake";
import { Link, useLocalSearchParams } from "expo-router";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import reactStringReplace from "react-string-replace";
import {
  ControllerFeedback,
  ControllerFeedbackRef,
} from "../components/ControllerFeedback";
import { DialogRef, openDialog } from "../components/Dialog";
import { Header } from "../components/Header";
import { HeaderMenu } from "../components/HeaderMenu";
import { InstrumentDialog } from "../components/InstrumentDialog";
import { ListMenuRef } from "../components/ListMenu";
import { LoadingPage } from "../components/LoadingPage";
import { OgTags } from "../components/OgTags";
import { PdfViewer } from "../components/PdfViewer";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { TimerBar, TimerBarRef } from "../components/TimerBar";
import { ViewSheetMenu } from "../components/ViewSheetMenu";
import { XmlViewer } from "../components/XmlViewer";
import { useFormatKey } from "../hooks/useFormatKey";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { useQuerySheet } from "../hooks/useQuerySheet";
import { ArrowDownIcon } from "../icons/ArrowDownIcon";
import { ArrowUpIcon } from "../icons/ArrowUpIcon";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { PauseIcon } from "../icons/PauseIcon";
import { RabbitIcon } from "../icons/RabbitIcon";
import { SnailIcon } from "../icons/SnailIcon";
import { getInstrumentOffset } from "../services/getInstrumentOffset";
import { black, blue, textGray } from "../theme/colors";
import { pagePadding } from "../theme/sizes";
import { getExtensionFromUrl } from "../utils";
import { NotFoundPage } from "./NotFoundPage";

type ElementToFormat = string | ReactNode[] | undefined;

const maxSpeed = 4;

// vel 1 = 12s
// vel 2 = 6s
// vel 3 = 3s
// vel 4 = 1.5s
const getTimeToScroll = (speed: number) => {
  const scrollScale = 1 / Math.pow(2, speed - 1);
  return 12_000 * scrollScale;
};

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
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const params = useLocalSearchParams();
  const id = String(params.id);

  const { data, isLoading } = useQuerySheet(id);

  const formatSheet = useFormatSheet();
  const formatKey = useFormatKey();
  const { settings } = useLocalSettings();
  const [instrument, setInstrument] = useState(settings.instrument);
  const [scrollSpeed, setScrollSpeed] = useState(0);

  const listMenuRef = useRef<ListMenuRef>(null);
  const instrumentDialogRef = useRef<DialogRef>(null);
  const controllerFeedbackRef = useRef<ControllerFeedbackRef>(null);
  const timerBarRef = useRef<TimerBarRef>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollPosRef = useRef(0);
  const timerPercentRef = useRef(0);

  useKeepAwake();

  const scroll = useCallback((amount: number) => {
    scrollViewRef.current?.scrollTo({
      y: scrollPosRef.current + amount,
    });
  }, []);

  useEffect(() => {
    let running = true;
    let lastNow: number;
    const timeToScroll = getTimeToScroll(scrollSpeed);
    const tick = (now: number) => {
      if (lastNow === undefined) {
        lastNow = now;
      }
      if (scrollSpeed) {
        const elapsed = now - lastNow;
        const increment = elapsed / timeToScroll;
        timerPercentRef.current += increment;
        if (timerPercentRef.current > 1) {
          timerPercentRef.current = 0;
          scroll(screenHeight * 0.5);
        }
        timerBarRef.current?.update(timerPercentRef.current);
      }
      lastNow = now;
      if (running) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
    return () => {
      running = false;
    };
  }, [scrollSpeed, scroll, screenHeight]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!data) {
    return <NotFoundPage />;
  }

  const needsAutoTransposition =
    getInstrumentOffset(instrument) !== getInstrumentOffset(data.instrument);

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onEnd((e) => {
      const doScroll = (direction: number) => {
        scroll(direction * screenHeight * 0.8);
        controllerFeedbackRef.current?.flash(
          direction > 0 ? (
            <ArrowDownIcon height={50} width={50} />
          ) : (
            <ArrowUpIcon height={50} width={50} />
          ),
        );
      };

      const changeSpeed = (increment: number) => {
        setScrollSpeed((v) => {
          const newSpeed = Math.max(0, Math.min(maxSpeed, v + increment));
          controllerFeedbackRef.current?.flash(
            newSpeed === 0 ? (
              <PauseIcon height={100} width={100} />
            ) : (
              <>
                {increment > 0 ? (
                  <RabbitIcon height={100} width={100} />
                ) : (
                  <SnailIcon height={100} width={100} />
                )}
                <Text style={{ textAlign: "center", fontSize: 32 }}>
                  {newSpeed}x
                </Text>
              </>
            ),
          );
          return newSpeed;
        });
      };

      const { absoluteX: x, absoluteY: y } = e;
      const edgeY = screenHeight * 0.15;
      const edgeX = screenWidth * 0.15;

      if (y < edgeY) {
        doScroll(-1);
      }
      if (y > screenHeight - edgeY) {
        doScroll(+1);
      }
      if (x < edgeX) {
        changeSpeed(-1);
      }
      if (x > screenWidth - edgeX) {
        changeSpeed(+1);
      }
    });

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

        <GestureDetector gesture={singleTap} touchAction="pan-y">
          <View style={{ paddingHorizontal: pagePadding, paddingBottom: 100 }}>
            <Text style={{ fontSize: 20, fontWeight: "500", color: black }}>
              {formatUrls(formatLyrics(formatSheet(data, instrument)))}
            </Text>
          </View>
        </GestureDetector>
      </ScrollView>

      <ControllerFeedback ref={controllerFeedbackRef} />

      <TimerBar ref={timerBarRef} />

      <InstrumentDialog
        ref={instrumentDialogRef}
        selectedItem={instrument}
        onSelect={(i) => setInstrument(i)}
      />
    </>
  );
};
