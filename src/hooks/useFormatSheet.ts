import { Instrument, Sheet } from "../database/types";
import { transpose } from "../services/transpose";
import { getAccidental } from "../services/transposeKey";
import { useFormatKey } from "./useFormatKey";
import { useLocalSettings } from "./useLocalSettings";

const getInstrumentOffset = (instrument?: Instrument): number =>
  instrument
    ? {
        Flauta: 0,
        Clarinete: +2,
        "Sax Soprano": +2,
        "Sax Alto": -3,
        "Sax Tenor": +2,
        Trompete: +2,
        Trombone: 0,
        Eufônio: 0,
        Tuba: 0,
      }[instrument]
    : 0;

export const useFormatSheet = () => {
  const formatKey = useFormatKey();
  const { settings } = useLocalSettings();
  const myOffset = getInstrumentOffset(settings.instrument);

  return (sheet: Sheet) => {
    const sheetOffset = getInstrumentOffset(sheet.instrument);
    const offset = -sheetOffset + myOffset;

    const key = formatKey(sheet);
    const accidental = getAccidental(key);

    return transpose(sheet.data, offset, accidental);
  };
};

export const useFormatSheet2 = () => {
  const formatKey = useFormatKey();

  return (sheet: Sheet, offset: number) => {
    const key = formatKey(sheet);
    const accidental = getAccidental(key);

    return transpose(sheet.data, offset, accidental);
  };
};
