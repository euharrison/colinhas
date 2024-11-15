import { Pressable, ScrollView, Text, View } from "react-native";
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
import { Button } from "../components/Button";

// const fileUrl = "http://downloads2.makemusic.com/musicxml/MozaVeilSample.xml"
// const fileUrl = "/musicxml/MozaVeilSample.xml";
// const fileUrl = "/musicxml/anunciacao.mxl";
const fileUrl = "/musicxml/Sulamericano-Marimbondo-2.0-Trombone_Cigarra.mxl";
// const fileUrl = "/musicxml/Sulamericano-Marimbondo-2.0.mxl";
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

    // console.log({ xmlContent });

    // Convert XML to JSON
    const jsonData = xmlToJson(xmlContent);
    // console.log("xmlToJson", jsonData);

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

const defaultZoom = 100;
const defaultDrawClef = false;

export const MusicXmlPage = () => {
  const [zoom, setZoom] = useState(defaultZoom);
  const [drawClef, setDrawClef] = useState(defaultDrawClef);

  const [autoScrollPx, setAutoScrollPx] = useState(0);
  const [autoScrollTick, setAutoScrollTick] = useState(1);

  const [instrumentIndex, setInstrumentIndex] = useState(0);
  const [instrumentOptions, setInstrumentOptions] = useState<Instrument[]>([]);

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollPosRef = useRef<number>(0);

  // useEffect(() => {
  //   const load = async () => {
  //     await fetchZippedXml(fileUrl);
  //   };
  //   load();
  // }, []);

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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Button onPress={() => onToggleClef()}>
            <Text>{drawClef ? "Esconder" : "Mostrar"} Clave</Text>
          </Button>

          <View style={{ width: 10 }} />

          <Text>Zoom: {zoom}%</Text>
          <Button onPress={() => onChangeZoom(-10)}>
            <Text>-10%</Text>
          </Button>
          <Button onPress={() => onChangeZoom(+10)}>
            <Text>+10%</Text>
          </Button>

          <View style={{ width: 10 }} />

          <Text>
            AutoScroll: {autoScrollPx}px/{autoScrollTick}s
          </Text>
          <Button onPress={() => onChangeAutoScrollPx(-5)}>
            <Text>-5px</Text>
          </Button>
          <Button onPress={() => onChangeAutoScrollPx(+5)}>
            <Text>+5px</Text>
          </Button>
          <Button onPress={() => onChangeAutoScrollTick(-1)}>
            <Text>-1s</Text>
          </Button>
          <Button onPress={() => onChangeAutoScrollTick(+1)}>
            <Text>+1s</Text>
          </Button>
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
