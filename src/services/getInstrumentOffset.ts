import { Instrument } from "../database/types";

export const getInstrumentOffset = (instrument?: Instrument): number =>
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
