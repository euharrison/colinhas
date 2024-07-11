import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { InstrumentContext } from "../contexts/InstrumentContext";
import { InstrumentSelector } from "./InstrumentSelector";
import { useLocalSettings } from "../hooks/useLocalSettings";

const key = "colinhas:instrument";

export const InstrumentProvider = ({ children }: { children: ReactNode }) => {
  const [ready, setReady] = useState(false);
  const [instrument, setInstrument] = useState("");

  const { updateSettings } = useLocalSettings();

  const updateInstrument = useCallback(
    (value: string) => {
      setInstrument(value);
      if (value === "Trombone" || value === "Tuba") {
        updateSettings({ accidental: "flat" });
      } else {
        updateSettings({ accidental: "sharp" });
      }
      AsyncStorage.setItem(key, value);
    },
    [updateSettings],
  );

  useEffect(() => {
    const load = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          setInstrument(value);
        }
      } catch {}
      setReady(true);
    };
    load();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <InstrumentContext.Provider value={{ instrument, updateInstrument }}>
      {instrument ? (
        children
      ) : (
        <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
          <InstrumentSelector />
        </View>
      )}
    </InstrumentContext.Provider>
  );
};
