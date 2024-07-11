import { Instrument, Sheet } from "../database/types";
import { transposeKey } from "../services/transposeKey";
import { useLocalSettings } from "./useLocalSettings";

const getInstrumentOffset = (instrument?: Instrument): number =>
  instrument
    ? {
        Sax: +3,
        Trompete: +2,
        Trombone: 0,
        Tuba: 0,
      }[instrument]
    : 0;

export const useFormatKey = () => {
  const { settings } = useLocalSettings();
  const myOffset = getInstrumentOffset(settings.instrument);

  return (sheet: Sheet) => {
    const sheetOffset = getInstrumentOffset(sheet.instrument);
    const offset = -sheetOffset + myOffset;
    return transposeKey(sheet.key, offset);
  };
};
