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

Seguindo pela opcao 2, fazer:
- tempo de articulacoes
- "planificar" o retornelo, S, Coda, Capo etc
*/

// const fileUrl = "http://downloads2.makemusic.com/musicxml/MozaVeilSample.xml"
// const fileUrl = "/musicxml/MozaVeilSample.xml";
// const fileUrl = "/musicxml/anunciacao.mxl";
const fileUrl = "/musicxml/Sulamericano-Marimbondo-2.0-Trombone_Cigarra.mxl";
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

function addNote({
  x,
  y,
  width = 5,
  height = 5,
  color = "red",
  border = "1px solid black",
  text = "",
}: {
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  border?: string;
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
  note.style.fontSize = "20px";
  note.style.lineHeight = "20px";
  note.style.fontFamily = "sans-serif";
  note.style.letterSpacing = "-1px";
  note.style.border = border;
  note.innerHTML = text;

  const container = document.getElementById("osmdContainer");
  if (container) {
    container.appendChild(note);
  }
}

type XmlMeasuse = {
  note: XmlNote[];
  barline?: XmlBarLine[];
};

type XmlNote = {
  duration: number;
  notations?: { articulations?: { staccato?: [""] }[] }[];
  pitch?: {
    alter?: ["-2" | "-1" | "1" | "2"];
    step: ["A" | "B" | "C" | "D" | "E" | "F" | "G"];
    octave: ["1" | "2" | "3" | "4" | "5"];
  }[];
  accidental?: ("bemol" | "natural" | "sharp")[]; // TODO validar o bemol
  tie?: { $: { type: "start" | "stop" } }[];
};

type NumberLike = string; // "1" | "2" | "3" ...

type XmlBarLine = {
  ending?: {
    $: {
      number: NumberLike;
      type: "start" | "stop";
    };
  }[];
  repeat?: {
    $: {
      // TODO validar o forward
      direction: "backward" | "forward";
    };
  }[];
};

export const MusicXmlPage = () => {
  const [instrumentIndex, setInstrumentIndex] = useState(0);
  const [instrumentOptions, setInstrumentOptions] = useState<Instrument[]>([]);

  const [json, setJson] = useState<any>();

  useEffect(() => {
    const load = async () => {
      await fetchZippedXml(fileUrl);
    };
    load();
  }, []);

  if (json) {
    const measures: XmlMeasuse[] =
      json["score-partwise"].part[instrumentIndex].measure;
    console.log(measures);

    let xCursor = 137;
    let duration = 0;
    let repeatReferenceStart = 0;
    let repeatReferenceStop = 0;

    // renderiza uma nota
    const renderNote = (n: XmlNote) => {
      duration += n.duration * 23.25;

      const staccato = n.notations?.find((i) =>
        i.articulations?.find((i) => i.staccato?.length),
      );
      if (staccato) {
        duration /= 2;
      }

      if (n.tie?.find((i) => i.$.type === "start")) {
        return;
      }

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

        // renderiza a nota
        addNote({
          x: xCursor,
          y,
          width: duration,
          height: 20,
          color: "rgba(0,255,255,0.5)",
          text,
        });
        xCursor += duration;
      }

      if (!n.pitch || staccato) {
        // TODO nao renderizar o silencio
        // renderiza o silêncio
        addNote({
          x: xCursor,
          y,
          width: duration,
          height: 20,
          color: "rgba(255,255,0,0.1)",
          border: "1px solid rgba(0,0,0,0.1)",
          text: "",
        });
        xCursor += duration;
      }

      duration = 0;
    };

    // renderiza um compasso
    const renderMeasure = (m: XmlMeasuse) => {
      m.note.forEach((n) => renderNote(n));
    };

    // para cada compasso, render
    measures.forEach((m, mIndex) => {
      renderMeasure(m);

      // se o compasso terminar com ritornelo
      const barline = m.barline;
      if (barline) {
        const ending = barline.find((i) => i.ending)?.ending;
        if (ending) {
          const startEnding = ending.find((i) => i.$.type === "start");
          if (startEnding) {
            repeatReferenceStop = mIndex;
          }
        }

        const repeat = barline.find((i) => i.repeat)?.repeat;
        if (repeat) {
          const startRepeat = repeat.find((i) => i.$.direction === "forward");
          if (startRepeat) {
            repeatReferenceStart = mIndex;
          }

          const endRepeat = repeat.find((i) => i.$.direction === "backward");
          if (endRepeat) {
            // TODO suporte para ritornelo com mais de duas voltas
            measures
              .slice(repeatReferenceStart, repeatReferenceStop)
              .forEach((m) => renderMeasure(m));

            repeatReferenceStart = mIndex;
          }
        }
      }
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
      osmd.load(fileUrl).then(function () {
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
