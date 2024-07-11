import { createContext } from "react";

export type LocalSettings = {
  env?: "prod" | "dev";
  accidental?: "sharp" | "flat";
};

export const LocalSettingsContext = createContext<{
  settings: LocalSettings;
  updateSettings: (settings: Partial<LocalSettings>) => void;
}>({
  settings: {},
  updateSettings: () => {},
});
