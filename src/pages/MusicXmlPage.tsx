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

function addCircle({ x, y }: { x: number; y: number }) {
  const circle = document.createElement("div");
  circle.style.position = "absolute";
  circle.style.width = "10px";
  circle.style.height = "10px";
  circle.style.backgroundColor = "red";
  circle.style.borderRadius = "50%";
  circle.style.left = `${x * 1.4}px`;
  circle.style.top = `${y}px`;
  const container = document.getElementById("osmdContainer");
  if (container) {
    container.appendChild(circle);
  }
}

export const MusicXmlPage = () => {
  const [instrumentIndex, setInstrumentIndex] = useState(0);
  const [instrumentOptions, setInstrumentOptions] = useState<Instrument[]>([]);

  const [json, setJson] = useState({});

  const osmdRef = useRef<OpenSheetMusicDisplay>();

  useEffect(() => {
    const load = async () => {
      const osmd = new OpenSheetMusicDisplay("osmdContainer");
      // osmd.setLogLevel("default");
      osmd.OnXMLRead = (xml) => {
        console.log({ xml });
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
              addCircle(measure.PositionAndShape.AbsolutePosition);
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
