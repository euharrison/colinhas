import { Instrument, Sheet } from "../database/types";
import { transpose } from "../services/transpose";
import { useLocalSettings } from "./useLocalSettings";

const getInstrumentOffset = (instrument?: Instrument): number =>
  instrument
    ? {
        Sax: -3,
        Trompete: +2,
        Trombone: 0,
        Tuba: 0,
      }[instrument]
    : 0;

export const useFormatSheet = () => {
  const { settings } = useLocalSettings();
  const myOffset = getInstrumentOffset(settings.instrument);

  return (sheet: Sheet) => {
    const sheetOffset = getInstrumentOffset(sheet.instrument);
    const offset = -sheetOffset + myOffset;
    return transpose(sheet.data, offset, settings.accidental ?? "sharp");
  };
};
