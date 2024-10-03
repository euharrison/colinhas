import { ScrollView, Text, View } from "react-native";
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

/*
TODO
- renderizar elementos personalizados alinhas com as notas

OPCAO 1
- pegar a posicao x da nota e adicionar um elemento na msm posicao
- e depois fixar a distance entre notas/largura do compasso

OPCAO 2
- usar a lib apenas para fazer o parse do xml e montar tudo na mão
- pode ser melhor pq os ritornelos passam a ficar flat sem dar um jump na musica
*/

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

function addNote({
  x,
  y,
  width = 5,
  height = 5,
  color = "red",
  text = "",
}: {
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  text?: string;
}) {
  const note = document.createElement("div");
  note.style.position = "absolute";
  note.style.width = `${width - 1}px`;
  note.style.height = `${height - 1}px`;
  note.style.backgroundColor = color;
  note.style.left = `${x}px`;
  note.style.top = `${y}px`;
  note.style.whiteSpace = "nowrap";
  note.style.fontSize = "14px";
  note.style.letterSpacing = "-1px";
  note.style.border = "1px solid black";
  note.innerHTML = text;

  const container = document.getElementById("osmdContainer");
  if (container) {
    container.appendChild(note);
  }
}

type XmlMeasuse = {
  note: XmlNote[];
};

type XmlNote = {
  duration: number;
  pitch?: {
    alter?: ["-2" | "-1" | "1" | "2"];
    step: ["A" | "B" | "C" | "D" | "E" | "F" | "G"];
    octave: ["1" | "2" | "3" | "4" | "5"];
  }[];
  accidental?: ("bemol" | "natural" | "sharp")[]; // TODO validar o bemol
  tie?: { $: { type: "start" | "stop" } }[];
};

export const MusicXmlPage = () => {
  const [instrumentIndex, setInstrumentIndex] = useState(0);
  const [instrumentOptions, setInstrumentOptions] = useState<Instrument[]>([]);

  const [json, setJson] = useState<any>();

  useEffect(() => {
    // fetchZippedXml("/musicxml/MozaVeilSample.xml")
    // fetchZippedXml("/musicxml/anunciacao.mxl")
    const load = async () => {
      await fetchZippedXml(
        // "/musicxml/Sulamericano-Marimbondo-2.0-Trombone_Cigarra.mxl",
        "/musicxml/anunciacao.mxl",
      );
    };
    load();
  }, []);

  if (json) {
    const measures: XmlMeasuse[] =
      json["score-partwise"].part[instrumentIndex].measure;
    console.log(measures);
    let xCursor = 137;
    let duration = 0;
    measures.forEach((m) => {
      m.note.forEach((n) => {
        duration += n.duration * 23.25;
        if (n.tie?.find((i) => i["$"].type === "start")) {
          return;
        }
        const x = xCursor;
        xCursor += duration;

        let text = "";
        let y = 300;
        if (n.pitch) {
          // TODO suporte para multiplas notas
          const pitch = n.pitch[0];

          const step = pitch.step[0];
          text += {
            A: "La",
            B: "Si",
            C: "Do",
            D: "Re",
            E: "Mi",
            F: "Fa",
            G: "Sol",
          }[step];

          const alter = pitch.alter?.[0];
          if (alter) {
            text += {
              "-2": "♭♭",
              "-1": "♭",
              "1": "♯",
              "2": "♯♯",
            }[alter];
          }

          const octave = Number(pitch.octave[0]);
          let yIndex = octave * 12;
          yIndex += {
            C: 0,
            D: 2,
            E: 4,
            F: 5,
            G: 7,
            A: 9,
            B: 11,
          }[step];
          if (alter) {
            yIndex += Number(alter);
          }
          const maxY = 200; // TODO calcular com base na nota mais grave
          const semiStepHeight = 5;
          y += maxY - yIndex * semiStepHeight;
        }

        addNote({
          x,
          y,
          width: duration,
          height: 15,
          color: n.pitch ? "rgba(0,255,255,0.5)" : "rgba(255,255,0,0.2)",
          text,
        });

        duration = 0;
      });
    });
  }

  // // Call the function with the URL of your zipped XML file
  // fetchZippedXml('path/to/your/file.zip');

  const osmdRef = useRef<OpenSheetMusicDisplay>();

  useEffect(() => {
    const load = async () => {
      const osmd = new OpenSheetMusicDisplay("osmdContainer");
      // osmd.setLogLevel("default");
      osmd.OnXMLRead = (xml) => {
        // console.log({ xml });
        return xml;
      };
      osmd.setOptions({
        backend: "svg",
        renderSingleHorizontalStaffline: true,
        drawingParameters: "compacttight",
        onXMLRead(xml) {
          parseString(xml, (err, result) => {
            setJson(result);
          });
          return xml;
        },
      });
      osmd
        // .load("http://downloads2.makemusic.com/musicxml/MozaVeilSample.xml")
        // .load("/musicxml/MozaVeilSample.xml")
        // .load("/musicxml/anunciacao.mxl")
        .load("/musicxml/Sulamericano-Marimbondo-2.0-Trombone_Cigarra.mxl")
        .then(function () {
          const container = document.getElementById("osmdContainer");
          if (container) {
            container.innerHTML = "";
          }

          osmdRef.current = osmd;

          // mantém a distancia igual em cada compasso
          osmd.EngravingRules.FixedMeasureWidth = true;

          setInstrumentOptions(osmd.Sheet.Instruments);

          const allParts = osmd.Sheet.Instruments;
          allParts.forEach((part, index) => {
            part.Visible = index === instrumentIndex;
          });

          osmd.render();

          osmd.GraphicSheet.MeasureList.forEach((measureArray) => {
            measureArray.forEach((measure) => {
              if (!measure) {
                return;
              }
              addNote(measure.PositionAndShape.AbsolutePosition);
            });
          });

          // osmd.GraphicSheet.MeasureList.forEach((measureArray) => {
          //   measureArray.forEach((measure) => {
          //     // Get the beams from each measure
          //     measure.staffEntries.forEach((entry) => {
          //       if (entry.graphicalVoiceEntries) {
          //         entry.graphicalVoiceEntries.forEach((gve) => {
          //           // gve.
          //           // gve.notes
          //           // console.log({ gve }, gve.notes);
          //           // console.log(gve.PositionAndShape);
          //           if (gve.notes) {
          //             gve.notes.forEach((note) => {
          //               addCustomVisualOnBeam(note);
          //             });
          //           }
          //           // if (gve.graphicalBeams) {
          //           //     gve.graphicalBeams.forEach((beam) => {
          //           //         addCustomVisualOnBeam(beam);
          //           //     });
          //           // }
          //         });
          //       }
          //     });
          //   });
          // });
        });
    };
    try {
      load();
    } catch (error) {
      console.error("[ERRO]", error);
    }
  }, [instrumentIndex]);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={{ flex: 1 }}>
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
          <ScrollView horizontal>
            <div id="osmdContainer" />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
