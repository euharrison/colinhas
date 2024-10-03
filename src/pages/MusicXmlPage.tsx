import { Text, View } from "react-native";
import { Header } from "../components/Header";

export const MusicXmlPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View
        style={{
          flex: 1,
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>MusicXml</Text>
      </View>
    </View>
  );
};
