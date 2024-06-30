import { Text, View } from "react-native";
import { Header } from "../components/Header";
import { InstrumentSelector } from "../components/InstrumentSelector";
import { router } from "expo-router";

export const SettingsPage = () => {
  return (
    <>
      <Header title="Configurações" />
      <View style={{ padding: 20 }}>
        <InstrumentSelector
          onChange={() => {
            router.back();
          }}
        />
      </View>
    </>
  );
};
