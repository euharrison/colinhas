import { Accidental, Instrument, Sheet } from "../database/types";
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

const guessAccidental = (sheet: Sheet): Accidental => {
  const sharpCount = sheet.data.match(/[♯|#]/g)?.length ?? 0;
  const flatCount = sheet.data.match(/[♭|b]/g)?.length ?? 0;
  return flatCount > sharpCount ? "flat" : "sharp";
};

export const useFormatSheet = () => {
  const formatKey = useFormatKey();
  const { settings } = useLocalSettings();
  const myOffset = getInstrumentOffset(settings.instrument);

  return (sheet: Sheet) => {
    const sheetOffset = getInstrumentOffset(sheet.instrument);
    const offset = -sheetOffset + myOffset;

    const key = formatKey(sheet);
    const accidental = key ? getAccidental(key) : guessAccidental(sheet);

    return transpose(sheet.data, offset, accidental);
  };
};
