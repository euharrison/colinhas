import { useContext } from "react";
import { LocalSettingsContext } from "../contexts/LocalSettingsContext";

export const useLocalSettings = () => {
  return useContext(LocalSettingsContext);
};
