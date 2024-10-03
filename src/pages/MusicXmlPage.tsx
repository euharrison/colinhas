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
} from "opensheetmusicdisplay";

/*
TODO
- renderizar ele totalmente na horizontal
- renderizar elementos personalizados alinhas com as notas
*/

export const MusicXmlPage = () => {
  const [instrumentIndex, setInstrumentIndex] = useState(0);
  const [instrumentOptions, setInstrumentOptions] = useState<Instrument[]>([]);

  const osmdRef = useRef<OpenSheetMusicDisplay>();

  useEffect(() => {
    const load = async () => {
      const osmd = new OpenSheetMusicDisplay("osmdContainer");
      osmd.setOptions({
        backend: "svg",
        // drawTitle: true,
        // drawPartNames: true,
        drawingParameters: "compacttight", // don't display title, composer etc., smaller margins
      });
      osmd
        // .load("http://downloads2.makemusic.com/musicxml/MozaVeilSample.xml")
        // .load("/musicxml/MozaVeilSample.xml")
        // .load("/musicxml/anunciacao.mxl")
        .load("/musicxml/Sulamericano-Marimbondo-2.0-Trombone_Cigarra.mxl")
        .then(function () {
          console.log("on load", osmd.Sheet.Instruments);
          osmdRef.current = osmd;
          setInstrumentOptions(osmd.Sheet.Instruments);
          const allParts = osmd.Sheet.Instruments;
          allParts.forEach((part, index) => {
            part.Visible = index === instrumentIndex;
          });
          const container = document.getElementById("osmdContainer");
          if (container) {
            container.innerHTML = "";
          }
          osmd.render();
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
      <ScrollView>
        <select onChange={(e) => setInstrumentIndex(Number(e.target.value))}>
          {instrumentOptions.map((o) => (
            <option key={o.Id} value={o.Id}>
              {o.Id} - {o.Name}
            </option>
          ))}
        </select>
        <div id="osmdContainer" />
      </ScrollView>
    </View>
  );
};
