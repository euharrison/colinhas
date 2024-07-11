import { Instrument } from "../config";
import { Sheet } from "../database/types";
import { transposeKey } from "../services/transposeKey";
import { useInstrument } from "./useInstrument";

const getInstrumentOffset = (instrument: string) =>
  ({
    [Instrument.Sax]: +3,
    [Instrument.Trumpet]: +2,
  })[instrument] ?? 0;

export const useFormatKey = () => {
  const instrument = useInstrument();
  const myOffset = getInstrumentOffset(instrument);

  return (sheet: Sheet) => {
    const sheetOffset = getInstrumentOffset(sheet.instrument);
    const offset = -sheetOffset + myOffset;
    return transposeKey(sheet.key, offset);
  };
};
