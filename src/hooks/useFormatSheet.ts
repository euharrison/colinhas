import { Sheet } from "../database/types";
import { Accidental, transpose } from "../services/transpose";
import { useInstrument } from "./useInstrument";

export const useFormatSheet = () => {
  const instrument = useInstrument();
  return (sheet: Sheet, accidental: Accidental = "sharp") =>
    transpose(sheet.data, sheet.instrument, instrument, accidental);
};
