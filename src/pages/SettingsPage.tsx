import { router } from "expo-router";
import { View } from "react-native";
import { Header } from "../components/Header";
import { InstrumentSelector } from "../components/InstrumentSelector";

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
