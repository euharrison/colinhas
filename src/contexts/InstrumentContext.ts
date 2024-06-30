import { createContext } from "react";

export const InstrumentContext = createContext<{
  instrument: string;
  updateInstrument: (value: string) => void;
}>({
  instrument: "",
  updateInstrument: () => {},
});
