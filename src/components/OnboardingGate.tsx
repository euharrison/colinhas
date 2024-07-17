import { ReactNode } from "react";
import { ScrollView } from "react-native";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { InstrumentSelector } from "./InstrumentSelector";

export const OnboardingGate = ({ children }: { children: ReactNode }) => {
  const { settings } = useLocalSettings();

  if (!settings.instrument) {
    return (
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <InstrumentSelector />
      </ScrollView>
    );
  }

  return <>{children}</>;
};
