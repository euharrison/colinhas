import { Instrument, Sheet } from "../database/types";
import { transposeKey } from "../services/transposeKey";
import { useLocalSettings } from "./useLocalSettings";

const getInstrumentOffsetForKeySignature = (instrument?: Instrument): number =>
  instrument
    ? {
        Flauta: 0,
        Clarinete: +2,
        "Sax Soprano": +2,
        "Sax Alto": +3,
        "Sax Tenor": +2,
        Trompete: +2,
        Trombone: 0,
        Eufônio: 0,
        Tuba: 0,
      }[instrument]
    : 0;

export const useFormatKey = () => {
  const { settings } = useLocalSettings();

  return (sheet: Sheet, instrument?: Instrument) => {
    if (!sheet.key) {
      return undefined;
    }
    const outputOffset = getInstrumentOffsetForKeySignature(
      instrument ?? settings.instrument,
    );
    const sheetOffset = getInstrumentOffsetForKeySignature(sheet.instrument);
    const offset = -sheetOffset + outputOffset;
    return transposeKey(sheet.key, offset);
  };
};
