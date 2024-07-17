import { SvgProps } from "react-native-svg";
import { Instrument } from "../database/types";
import { ClarinetIcon } from "./ClarinetIcon";
import { FluteIcon } from "./FluteIcon";
import { SaxIcon } from "./SaxIcon";
import { TromboneIcon } from "./TromboneIcon";
import { TrumpetIcon } from "./TrumpetIcon";
import { TubaIcon } from "./TubaIcon";

export const InstrumentIcon = ({
  instrument,
  ...props
}: { instrument?: Instrument } & SvgProps) => {
  switch (instrument) {
    case "Flauta":
      return <FluteIcon {...props} />;
    case "Clarinete":
      return <ClarinetIcon {...props} />;
    case "Sax Soprano":
    case "Sax Alto":
    case "Sax Tenor":
      return <SaxIcon {...props} />;
    case "Trompete":
      return <TrumpetIcon {...props} />;
    case "Trombone":
      return <TromboneIcon {...props} />;
    case "Tuba":
      return <TubaIcon {...props} />;
    default:
      return null;
  }
};
