import { ReactNode } from "react";
import { View } from "react-native";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { InstrumentSelector } from "./InstrumentSelector";

export const InstrumentProvider = ({ children }: { children: ReactNode }) => {
  const { settings } = useLocalSettings();

  if (!settings.instrument) {
    return (
      <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
        <InstrumentSelector />
      </View>
    );
  }

  return <>{children}</>;
};
