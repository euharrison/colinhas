import { createContext } from "react";

export type LocalSettings = {
  env?: "prod" | "dev";
};

export const LocalSettingsContext = createContext<{
  settings: LocalSettings;
  updateSettings: (settings: Partial<LocalSettings>) => void;
}>({
  settings: {},
  updateSettings: () => {},
});
