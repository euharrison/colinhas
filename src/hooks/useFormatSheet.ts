import { Accidental, Instrument, Sheet } from "../database/types";
import { getInstrumentOffset } from "../services/getInstrumentOffset";
import { transpose } from "../services/transpose";
import { getAccidental } from "../services/transposeKey";
import { useFormatKey } from "./useFormatKey";
import { useLocalSettings } from "./useLocalSettings";

const guessAccidental = (sheet: Sheet): Accidental => {
  const sharpCount = sheet.data.match(/[♯|#]/g)?.length ?? 0;
  const flatCount = sheet.data.match(/[♭|b]/g)?.length ?? 0;
  return flatCount > sharpCount ? "flat" : "sharp";
};

export const useFormatSheet = () => {
  const formatKey = useFormatKey();
  const { settings } = useLocalSettings();

  return (sheet: Sheet, instrument?: Instrument) => {
    const outputInstrument = instrument ?? settings.instrument;
    const outputOffset = getInstrumentOffset(outputInstrument);
    const sheetOffset = getInstrumentOffset(sheet.instrument);
    const offset = -sheetOffset + outputOffset;

    const key = formatKey(sheet, outputInstrument);
    const accidental = key ? getAccidental(key) : guessAccidental(sheet);

    return transpose(sheet.data, offset, accidental);
  };
};
