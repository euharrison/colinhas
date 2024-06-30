import { useContext } from "react";
import { AccidentalContext } from "../contexts/AccidentalContext";

export const useAccidental = () => {
  return useContext(AccidentalContext).accidental;
};
