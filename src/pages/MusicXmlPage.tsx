import { ScrollView, Text, View } from "react-native";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import {
  OpenSheetMusicDisplay,
  Cursor,
  VoiceEntry,
  Note,
  StemDirectionType,
} from "opensheetmusicdisplay";

export const MusicXmlPage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const load = async () => {
      // const response = await fetch("musicxml/anunciacao.xml");
      // const response = await fetch("musicxml/anunciacao.mxl");
      // console.log(response);

      const osmd = new OpenSheetMusicDisplay("osmdContainer");
      osmd.setOptions({
        backend: "svg",
        drawTitle: true,
        drawingParameters: "compacttight", // don't display title, composer etc., smaller margins
      });
      osmd
        // .load("http://downloads2.makemusic.com/musicxml/MozaVeilSample.xml")
        // .load("/musicxml/MozaVeilSample.xml")
        .load("/musicxml/anunciacao.mxl")
        .then(function () {
          osmd.render();
        });
    };
    load();
    // anunciacao.xml
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView>
        <div id="osmdContainer" />
      </ScrollView>
    </View>
  );
};
