import { Sheet } from "../database/types";
import { transpose } from "../services/transpose";
import { useAccidental } from "./useAccidental";
import { useInstrument } from "./useInstrument";

export const useFormatSheet = () => {
  const accidental = useAccidental();
  const instrument = useInstrument();

  return (sheet: Sheet) =>
    transpose(sheet.data, sheet.instrument, instrument, accidental);
};
