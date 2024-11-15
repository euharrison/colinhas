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

const host = "https://harrison.com.br/temp/colinhas-mxl/";

const musicUrlList = [
  "A_Lenda-Marimbondo-15.0.mxl",
  "Aqui_no_Mar-Marimbondo-5.0.mxl",
  "Bella_Ciao-Marimbondo-10.0.mxl",
  "Clandestino-Marimbondo-14.mxl",
  "Down_In_Mexico-Marimbondo-6.0.mxl",
  "Hips_Don_t_Lie-Marimbondo-11.mxl",
  "Ilegal, Imoral ou Engorda - Marimbondo - 2.0.mxl",
  "Lilas-Marimbondo-8.0.mxl",
  "Lua_de_Cristal-Marimbondo-7.5.mxl",
  "Nem luxo nem lixo - Marimbondo - 3.0.mxl",
  "No_Soy_De_Aqui-Marimbondo-7.0.mxl",
  "Non, a Francesa - Marimbondo - 2.0.mxl",
  "O_Meu_Sangue_Ferve_Por_Voce-9.mxl",
  "Pade Ona-Marimbondo-6.0.mxl",
  "Palco-Marimbondo-6.0.mxl",
  "Sangue Latino-Marimbondo-2.0.mxl",
  "Suite + Dorival - Marimbondo - 4.mxl",
  "Sulamericano-Marimbondo-2.0.mxl",
];

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

export const MusicXmlPage = () => {
  const [musicUrl, setMusicUrl] = useState<string>("");
  const [instrumentId, setInstrumentId] = useState<string>("");
  const [instrumentOptions, setInstrumentOptions] = useState<Instrument[]>([]);

  const [drawClef, setDrawClef] = useState(defaultDrawClef);
  const [spacing, setSpacing] = useState(defaultZoom);
  const [zoom, setZoom] = useState(defaultZoom);

  const [autoScrollPx, setAutoScrollPx] = useState(0);
  const [autoScrollTick, setAutoScrollTick] = useState(1);

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollPosRef = useRef<number>(0);

  const osmdRef = useRef<OpenSheetMusicDisplay>();

  useEffect(() => {
    const clear = () => {
      const container = document.getElementById(divRenderId);
      if (container) {
        container.innerHTML = "";
      }
      setInstrumentId("");
      setInstrumentOptions([]);
    };

    const load = async () => {
      const osmd = new OpenSheetMusicDisplay(divRenderId);
      osmd.setOptions({
        backend: "svg",
        drawingParameters: "compacttight",
        drawMeasureNumbers: false,
      });

      osmd.Zoom = defaultZoom / 100;
      osmd.DrawingParameters.Rules.RenderClefsAtBeginningOfStaffline =
        defaultDrawClef;

      // Relevant parameters if you want to change the spacing:
      // osmd.EngravingRules.VoiceSpacingMultiplier = 2; // default 0.85, 0.65 in compacttight mode
      // osmd.EngravingRules.VoiceSpacingAddend = 5; // default 3.0, 2.0 in compacttight mode
      osmd.EngravingRules.VoiceSpacingMultiplierVexflow = defaultSpacing / 100;

      await osmd.load(`${host}${musicUrl}`);
      osmdRef.current = osmd;

      clear();

      const instruments = osmd.Sheet.Instruments;
      instruments.forEach((i) => {
        i.Visible = false;
      });
      setInstrumentOptions(instruments);
    };
    if (musicUrl) {
      load().catch((e) => {
        clear();
        setTimeout(() => {
          alert("Erro ao carregar a música");
        });
      });
    }
  }, [musicUrl]);

  const onChangeInstrument = (id: string) => {
    startTransition(() => {
      setInstrumentId(() => {
        if (osmdRef.current) {
          const allParts = osmdRef.current.Sheet.Instruments;
          allParts.forEach((part) => {
            part.Visible = part.IdString === id;
          });
          osmdRef.current.render();
        }
        return id;
      });
    });
  };

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
    <View style={{ flex: 1 }}>
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
        <View style={{ padding: 20, gap: 5 }}>
          <Text>Música:</Text>
          <select
            value={musicUrl}
            onChange={(e) => setMusicUrl(e.target.value)}
          >
            <option value="" />
            {musicUrlList.map((musicUrl) => (
              <option key={musicUrl} value={musicUrl}>
                {musicUrl}
              </option>
            ))}
          </select>
          <Text>Instrumento:</Text>
          <select
            value={instrumentId}
            onChange={(e) => onChangeInstrument(e.target.value)}
          >
            <option value="" />
            {instrumentOptions.map((o) => (
              <option key={o.IdString} value={o.IdString}>
                {o.Name}
              </option>
            ))}
          </select>
        </View>

        <View style={{ flex: 1 }}>
          <View id={divRenderId} />
        </View>
      </ScrollView>
    </View>
  );
};
