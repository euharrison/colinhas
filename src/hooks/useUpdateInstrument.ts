import { useContext } from "react";
import { InstrumentContext } from "../contexts/InstrumentContext";

export const useUpdateInstrument = () => {
  return useContext(InstrumentContext).updateInstrument;
};
