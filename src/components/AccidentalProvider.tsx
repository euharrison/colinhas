import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  Accidental,
  AccidentalContext,
  defaultAccidental,
} from "../contexts/AccidentalContext";

const key = "colinhas:accidental";

export const AccidentalProvider = ({ children }: { children: ReactNode }) => {
  const [ready, setReady] = useState(false);
  const [accidental, setAccidental] = useState(defaultAccidental);

  const updateAccidental = useCallback((value: Accidental) => {
    setAccidental(value);
    AsyncStorage.setItem(key, value);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          setAccidental(value as Accidental);
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
    <AccidentalContext.Provider value={{ accidental, updateAccidental }}>
      {children}
    </AccidentalContext.Provider>
  );
};
