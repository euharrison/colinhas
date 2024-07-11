import { createContext } from "react";
import { Instrument } from "../database/types";

export type LocalSettings = {
  env?: "prod" | "dev";
  instrument?: Instrument;
  accidental?: "sharp" | "flat";
};

export const LocalSettingsContext = createContext<{
  settings: LocalSettings;
  updateSettings: (settings: Partial<LocalSettings>) => void;
}>({
  settings: {},
  updateSettings: () => {},
});
