import { SvgProps } from "react-native-svg";
import { Instrument } from "../config";
import { SaxIcon } from "./SaxIcon";
import { TromboneIcon } from "./TromboneIcon";
import { TrumpetIcon } from "./TrumpetIcon";
import { TubaIcon } from "./TubaIcon";

export const InstrumentIcon = ({
  instrument,
  ...props
}: { instrument: string } & SvgProps) => {
  switch (instrument) {
    case Instrument.Sax:
      return <SaxIcon {...props} />;
    case Instrument.Trumpet:
      return <TrumpetIcon {...props} />;
    case Instrument.Trombone:
      return <TromboneIcon {...props} />;
    case Instrument.Tuba:
      return <TubaIcon {...props} />;
  }
  return null;
};
