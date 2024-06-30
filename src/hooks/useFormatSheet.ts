import { Sheet } from "../database/types";
import { transpose } from "../services/transpose";
import { useAccidental } from "./useAccidental";
import { useInstrument } from "./useInstrument";

const trumpetOffset = -2;
const saxOffset = +3;

const getOffset = (instrument: string) =>
  ({
    Trompete: trumpetOffset,
    Sax: saxOffset,
  })[instrument] ?? 0;

export const useFormatSheet = () => {
  const accidental = useAccidental();
  const instrument = useInstrument();
  const outputOffset = getOffset(instrument);

  return (sheet: Sheet) => {
    const inputOffset = getOffset(sheet.instrument);
    const offset = inputOffset - outputOffset;
    return transpose(sheet.data, offset, accidental);
  };
};
