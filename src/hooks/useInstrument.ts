import { useContext } from "react";
import { InstrumentContext } from "../contexts/InstrumentContext";

export const useInstrument = () => {
  return useContext(InstrumentContext);
};
