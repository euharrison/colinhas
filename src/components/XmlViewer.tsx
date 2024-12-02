import { Instrument, OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import { startTransition, useEffect, useRef, useState } from "react";
import {
  Pressable,
  PressableProps,
  ScrollView,
  Text,
  TextStyle,
  View,
} from "react-native";
import { backgroundGray, borderGray, white } from "../theme/colors";

const defaultSpacing = 100;
const defaultZoom = 100;
const defaultDrawClef = false;

const divRenderId = "osmdContainer";

export const Button = ({
  children,
  style,
  textStyle,
  ...props
}: PressableProps & { textStyle?: TextStyle }) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        {
          borderWidth: 1,
          borderColor: borderGray,
          padding: 8,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: pressed ? backgroundGray : white,
        },
        typeof style === "function" ? style({ pressed }) : style,
      ]}
    >
      {typeof children === "string" ? (
        <Text
          style={{
            fontSize: 12,
            ...textStyle,
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

export const XmlViewer = ({ url }: { url: string }) => {
  const [drawClef, setDrawClef] = useState(defaultDrawClef);
  const [spacing, setSpacing] = useState(defaultZoom);
  const [zoom, setZoom] = useState(defaultZoom);

  const [autoScrollPx, setAutoScrollPx] = useState(0);
  const [autoScrollTick, setAutoScrollTick] = useState(1);

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollPosRef = useRef<number>(0);

  const osmdRef = useRef<OpenSheetMusicDisplay>();

  useEffect(() => {
    // TODO melhorar o get
    const musicUrl = url;
    const instrumentId = Number(
      decodeURI(new URL(url).search.split("instrumentId=")[1]),
    );

    const clear = () => {
      const container = document.getElementById(divRenderId);
      if (container) {
        container.innerHTML = "";
      }
    };

    const load = async () => {
      const osmd = new OpenSheetMusicDisplay(divRenderId);
      osmd.setOptions({
        backend: "svg",
        drawingParameters: "compacttight",
        drawMeasureNumbers: false,
      });

      // margem geral
      osmd.EngravingRules.PageLeftMargin = 1.0;
      osmd.EngravingRules.PageRightMargin = 1.0;

      // zoom
      osmd.Zoom = defaultZoom / 100;

      // desenha a clave
      osmd.DrawingParameters.Rules.RenderClefsAtBeginningOfStaffline =
        defaultDrawClef;

      // espaçamento entre notas (beams)
      // osmd.EngravingRules.VoiceSpacingAddend = 5; // default 3.0, 2.0 in compacttight mode
      osmd.EngravingRules.VoiceSpacingMultiplierVexflow = defaultSpacing / 100; // default 0.85, 0.65 in compacttight mode

      // fixa a largura do compasso
      osmd.EngravingRules.FixedMeasureWidth = true;

      // influencia o espaçamento "line break"
      osmd.EngravingRules.MinSkyBottomDistBetweenSystems = 3.0; // default 5.0, 1.0 in compacttight mode

      await osmd.load(musicUrl);
      osmdRef.current = osmd;

      clear();

      const instruments = osmd.Sheet.Instruments;
      instruments.forEach((i) => {
        i.Visible = i.Id === instrumentId;
      });
    };
    if (musicUrl) {
      load().catch(() => {
        clear();
        setTimeout(() => {
          alert("Erro ao exibir a música");
        });
      });
    }
  }, [url]);

  const onToggleClef = () => {
    startTransition(() => {
      setDrawClef((v) => {
        const newValue = !v;
        if (osmdRef.current) {
          osmdRef.current.DrawingParameters.Rules.RenderClefsAtBeginningOfStaffline =
            newValue;
          osmdRef.current.render();
        }
        return newValue;
      });
    });
  };

  const onChangeSpacing = (diff: number) => {
    startTransition(() => {
      setSpacing((v) => {
        const newValue = v + diff;
        if (osmdRef.current) {
          osmdRef.current.EngravingRules.VoiceSpacingMultiplierVexflow =
            newValue / 100;
          osmdRef.current.render();
        }
        return newValue;
      });
    });
  };

  const onChangeZoom = (diff: number) => {
    startTransition(() => {
      setZoom((v) => {
        const newValue = v + diff;
        if (osmdRef.current) {
          osmdRef.current.Zoom = newValue / 100;
          osmdRef.current.render();
        }
        return newValue;
      });
    });
  };

  const onChangeAutoScrollPx = (diff: number) => {
    setAutoScrollPx((v) => v + diff);
  };

  const onChangeAutoScrollTick = (diff: number) => {
    setAutoScrollTick((v) => v + diff);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoScrollPx && autoScrollTick) {
      interval = setInterval(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            y: scrollPosRef.current + autoScrollPx,
            animated: true,
          });
        }
      }, autoScrollTick * 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [autoScrollPx, autoScrollTick]);

  return (
    <>
      <View>
        <ScrollView horizontal>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Button onPress={() => onToggleClef()}>
              {drawClef ? "Esconder Clave" : "Mostrar Clave"}
            </Button>

            <View style={{ width: 5 }} />

            <Text>Espaçamento: {spacing}%</Text>
            <Button onPress={() => onChangeSpacing(-10)}>-</Button>
            <Button onPress={() => onChangeSpacing(+10)}>+</Button>

            <View style={{ width: 5 }} />

            <Text>Zoom: {zoom}%</Text>
            <Button onPress={() => onChangeZoom(-10)}>-</Button>
            <Button onPress={() => onChangeZoom(+10)}>+</Button>

            <View style={{ width: 5 }} />

            <Text>
              AutoScroll: {autoScrollPx}px/{autoScrollTick}s
            </Text>
            <Button onPress={() => onChangeAutoScrollPx(-5)}>-5px</Button>
            <Button onPress={() => onChangeAutoScrollPx(+5)}>+5px</Button>
            <Button onPress={() => onChangeAutoScrollTick(-1)}>-1s</Button>
            <Button onPress={() => onChangeAutoScrollTick(+1)}>+1s</Button>
          </View>
        </ScrollView>
      </View>

      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        onScroll={(e) => {
          scrollPosRef.current = e.nativeEvent.contentOffset.y;
        }}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <Text>xml...</Text>
          <View id={divRenderId} />
        </View>
      </ScrollView>
    </>
  );
};
