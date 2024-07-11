import { Instrument } from "../config";
import { Sheet } from "../database/types";
import { transpose } from "../services/transpose";
import { useInstrument } from "./useInstrument";
import { useLocalSettings } from "./useLocalSettings";

const getInstrumentOffset = (instrument: string) =>
  ({
    [Instrument.Sax]: -3,
    [Instrument.Trumpet]: +2,
  })[instrument] ?? 0;

export const useFormatSheet = () => {
  const { settings } = useLocalSettings();
  const instrument = useInstrument();
  const myOffset = getInstrumentOffset(instrument);

  return (sheet: Sheet) => {
    const sheetOffset = getInstrumentOffset(sheet.instrument);
    const offset = -sheetOffset + myOffset;
    return transpose(sheet.data, offset, settings.accidental ?? "sharp");
  };
};
