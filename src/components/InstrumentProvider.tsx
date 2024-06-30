import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { InstrumentContext } from "../contexts/InstrumentContext";
import { InstrumentSelector } from "./InstrumentSelector";

const key = "colinhas:instrument";

export const InstrumentProvider = ({ children }: { children: ReactNode }) => {
  const [ready, setReady] = useState(false);
  const [instrument, setInstrument] = useState("");

  const updateInstrument = (value: string) => {
    setInstrument(value);
    AsyncStorage.setItem(key, value);
  };

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

  if (!instrument) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 20,
          gap: 20,
        }}
      >
        <View>
          <Text style={{ fontSize: 20 }}>Escolha seu instrumento</Text>
          <Text style={{ color: "#999" }}>
            Você poderá trocar depois se preferir
          </Text>
        </View>
        <InstrumentSelector onSelect={updateInstrument} />
      </View>
    );
  }

  return (
    <InstrumentContext.Provider value={{ instrument, updateInstrument }}>
      {children}
    </InstrumentContext.Provider>
  );
};
