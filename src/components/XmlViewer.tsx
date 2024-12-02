import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
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
const defaultZoom = 50;

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
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: pressed ? backgroundGray : white,
        },
        typeof style === "function" ? style({ pressed }) : style,
      ]}
    >
      {typeof children === "string" ? (
        <Text style={{ fontSize: 12, ...textStyle }}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

export const XmlViewer = ({ url }: { url: string }) => {
  const [spacing, setSpacing] = useState(defaultZoom);
  const [zoom, setZoom] = useState(defaultZoom);

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollPosRef = useRef<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const osmdRef = useRef<OpenSheetMusicDisplay>();

  useEffect(() => {
    const clear = () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };

    const load = async () => {
      if (!containerRef.current) {
        return null;
      }
      const osmd = new OpenSheetMusicDisplay(containerRef.current);
      await osmd.load(url);
      osmdRef.current = osmd;

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
      osmd.DrawingParameters.Rules.RenderClefsAtBeginningOfStaffline = false;

      // espaçamento entre notas (beams)
      // osmd.EngravingRules.VoiceSpacingAddend = 5; // default 3.0, 2.0 in compacttight mode
      osmd.EngravingRules.VoiceSpacingMultiplierVexflow = defaultSpacing / 100; // default 0.85, 0.65 in compacttight mode

      // fixa a largura do compasso
      osmd.EngravingRules.FixedMeasureWidth = true;

      // influencia o espaçamento "line break"
      osmd.EngravingRules.MinSkyBottomDistBetweenSystems = 3.0; // default 5.0, 1.0 in compacttight mode

      const instrumentId = Number(
        decodeURI(new URL(url).search.split("instrumentId=")[1]),
      );
      if (instrumentId) {
        const instruments = osmd.Sheet.Instruments;
        instruments.forEach((i) => {
          i.Visible = i.Id === instrumentId;
        });
      }

      osmd.render();
    };

    if (url) {
      load().catch(() => {
        clear();
        setTimeout(() => {
          alert("Erro ao exibir a música");
        });
      });
    }

    return () => {
      clear();
    };
  }, [url]);

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

  return (
    <View style={{ width: "100%" }}>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={{ fontSize: 12 }}>Espaçamento: {spacing}%</Text>
          <Button onPress={() => onChangeSpacing(-10)}>-</Button>
          <Button onPress={() => onChangeSpacing(+10)}>+</Button>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={{ fontSize: 12 }}>Zoom: {zoom}%</Text>
          <Button onPress={() => onChangeZoom(-10)}>-</Button>
          <Button onPress={() => onChangeZoom(+10)}>+</Button>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        onScroll={(e) => {
          scrollPosRef.current = e.nativeEvent.contentOffset.y;
        }}
        contentContainerStyle={{ flex: 1 }}
      >
        <View ref={containerRef as any} />
      </ScrollView>
    </View>
  );
};
