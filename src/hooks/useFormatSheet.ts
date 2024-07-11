import { Instrument } from "../config";
import { Sheet } from "../database/types";
import { transpose } from "../services/transpose";
import { useAccidental } from "./useAccidental";
import { useInstrument } from "./useInstrument";

const getInstrumentOffset = (instrument: string) =>
  ({
    [Instrument.Sax]: -3,
    [Instrument.Trumpet]: +2,
  })[instrument] ?? 0;

export const useFormatSheet = () => {
  const accidental = useAccidental();
  const instrument = useInstrument();
  const myOffset = getInstrumentOffset(instrument);

  return (sheet: Sheet) => {
    const sheetOffset = getInstrumentOffset(sheet.instrument);
    const offset = -sheetOffset + myOffset;
    return transpose(sheet.data, offset, accidental);
  };
};
