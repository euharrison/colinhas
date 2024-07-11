import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  LocalSettings,
  LocalSettingsContext,
} from "../contexts/LocalSettingsContext";
import { updateToDevEnv } from "../database/sheet";
import { LoadingPage } from "./LoadingPage";

const storageKey = "colinhas:localSettings";

export const LocalSettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [ready, setReady] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});

  const updateSettings = useCallback((update: Partial<LocalSettings>) => {
    setSettings((v) => {
      const newValue = { ...v, ...update };
      AsyncStorage.setItem(storageKey, JSON.stringify(newValue));
      return newValue;
    });
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const storageValue = await AsyncStorage.getItem(storageKey);
        const json: LocalSettings | undefined = storageValue
          ? JSON.parse(storageValue)
          : undefined;

        if (json) {
          setSettings(json);

          if (json.env === "dev") {
            updateToDevEnv();
          }
        }
      } catch {}
      setReady(true);
    };
    load();
  }, []);

  if (!ready) {
    return <LoadingPage />;
  }

  return (
    <LocalSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </LocalSettingsContext.Provider>
  );
};
