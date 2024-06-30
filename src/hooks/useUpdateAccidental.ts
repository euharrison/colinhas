import { useContext } from "react";
import { AccidentalContext } from "../contexts/AccidentalContext";

export const useUpdateAccidental = () => {
  return useContext(AccidentalContext).updateAccidental;
};
