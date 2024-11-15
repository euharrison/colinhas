import {
  Pressable,
  PressableProps,
  ScrollView,
  Text,
  TextStyle,
  View,
} from "react-native";
import { Header } from "../components/Header";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  OpenSheetMusicDisplay,
  Cursor,
  VoiceEntry,
  Note,
  StemDirectionType,
  Instrument,
  Beam,
  GraphicalNote,
} from "opensheetmusicdisplay";
import { parseString } from "xml2js";
import JSZip from "jszip";
import { startTransition } from "react";
import { backgroundGray, borderGray, white } from "../theme/colors";

const host = "https://harrison.com.br/temp/colinhas-mxl/";

const files = [
  "Sulamericano-Marimbondo-2.0-Trombone_Cigarra.mxl",
  "Sulamericano-Marimbondo-2.0-Trombone_Cigarra.mxl",
  "Sulamericano-Marimbondo-2.0-Trombone_Cigarra.mxl",
  "Sulamericano-Marimbondo-2.0-Trombone_Cigarra.mxl",
];

// const fileUrl = "http://downloads2.makemusic.com/musicxml/MozaVeilSample.xml"
// const fileUrl = "/musicxml/MozaVeilSample.xml";
// const fileUrl = "/musicxml/anunciacao.mxl";
// const fileUrl =
//   "https://harrison.com.br/temp/colinhas-mxl/Sulamericano-Marimbondo-2.0-Trombone_Cigarra.mxl";
// const fileUrl = "/musicxml/Sulamericano-Marimbondo-2.0-Trombone_Cigarra.mxl";
// const fileUrl = "/musicxml/Sulamericano-Marimbondo-2.0.mxl";
// const fileUrl = "/musicxml/A_Lenda-Marimbondo-15.0.mxl";
const fileUrl =
  "/musicxml/Sulamericano-Marimbondo-2.0-Trombone_Abelha.musicxml";
// const fileUrl =
//   "/musicxml/Sulamericano-Marimbondo-2.0-Trombone_Cigarra.musicxml";
// const fileUrl = "/musicxml/Sulamericano-Marimbondo-2.0-Trombone_Cigarra.musicxml";
// const fileUrl =
//   "/musicxml/Ilegal, Imoral ou Engorda - Marimbondo - 2.0-Trombone_Cigarra.mxl";

async function fetchZippedXml(url: string): Promise<void> {
  try {
    // Fetch the zipped XML file
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    // Get the blob from the response
    const blob = await response.blob();

    // Load the blob into JSZip
    const zip = await JSZip.loadAsync(blob);

    // Assuming the XML file is named 'data.xml' in the zip
    const xmlFile = zip.file("score.xml");
    if (!xmlFile) throw new Error("XML file not found in the zip");

    // Get the content of the XML file as a string
    const xmlContent = await xmlFile.async("string");

    console.log({ xmlContent });

    // Convert XML to JSON
    const jsonData = xmlToJson(xmlContent);
    console.log("xmlToJson", jsonData);

    parseString(xmlContent, (err, result) => {
      // console.log("parseString", result);
    });
  } catch (error) {
    console.error("Error fetching or processing the file:", error);
  }
}

function xmlToJson(xml: string): any {
  // Create a JSON object
  const obj: { [key: string]: any } = {};

  // If the input is not an XML string, return an empty object
  if (typeof xml !== "string") {
    return obj;
  }

  // Parse the XML string into a DOM object
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "application/xml");

  // Recursive function to convert XML to JSON
  function convert(node: Node): void {
    if (node.nodeType === 1) {
      // Element
      const nodeName = node.nodeName;
      obj[nodeName] = obj[nodeName] || [];

      const child: { [key: string]: string } = {};
      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        child[attr.nodeName] = attr.nodeValue || "";
      }

      if (node.childNodes.length === 0) {
        obj[nodeName].push(child);
      } else {
        for (let i = 0; i < node.childNodes.length; i++) {
          convert(node.childNodes[i]);
        }
      }
      obj[nodeName].push(child);
    } else if (node.nodeType === 3) {
      // Text
      const textContent = node.nodeValue?.trim();
      if (textContent) {
        obj["#text"] = textContent;
      }
    }
  }

  // Start the conversion
  convert(xmlDoc.documentElement);
  return obj;
}

const defaultSpacing = 100;
const defaultZoom = 100;
const defaultDrawClef = false;

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
  const [drawClef, setDrawClef] = useState(defaultDrawClef);
  const [spacing, setSpacing] = useState(defaultZoom);
  const [zoom, setZoom] = useState(defaultZoom);

  const [autoScrollPx, setAutoScrollPx] = useState(0);
  const [autoScrollTick, setAutoScrollTick] = useState(1);

  const [instrumentIndex, setInstrumentIndex] = useState(0);
  const [instrumentOptions, setInstrumentOptions] = useState<Instrument[]>([]);

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollPosRef = useRef<number>(0);

  useEffect(() => {
    const load = async () => {
      // await fetchZippedXml(fileUrl);
    };
    load();
  }, []);

  const osmdRef = useRef<OpenSheetMusicDisplay>();

  useEffect(() => {
    const load = async () => {
      const osmd = new OpenSheetMusicDisplay("osmdContainer");
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

      await osmd.load(fileUrl);
      const container = document.getElementById("osmdContainer");
      if (container) {
        container.innerHTML = "";
      }

      osmdRef.current = osmd;

      // TODO instrumento
      // setInstrumentOptions(osmd.Sheet.Instruments);
      // const allParts = osmd.Sheet.Instruments;
      // allParts.forEach((part, index) => {
      //   part.Visible = index === instrumentIndex;
      // });

      osmd.render();
    };
    try {
      load();
    } catch (error) {
      console.error("[ERRO]", error);
    }
  }, [instrumentIndex]);

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
        <select
          onChange={(e) => setInstrumentIndex(Number(e.target.value))}
          style={{ margin: 20 }}
        >
          {instrumentOptions.map((o) => (
            <option key={o.Id} value={o.Id}>
              {o.Id} - {o.Name}
            </option>
          ))}
        </select>

        <View style={{ flex: 1 }}>
          <View id="osmdContainer" />
        </View>
      </ScrollView>
    </View>
  );
};
