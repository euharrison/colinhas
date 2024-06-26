import { useRef } from "react";
import { View } from "react-native";
import { Instrument, InstrumentRef } from "../components/Instrument";

// const testValue = `20 25 32 37 44 49 49
// 24 19
// 20 20 21 21 21 21 19..
// 23__ 35.. 36`;

const tromboneOffset = 0;
const trumpetOffset = -2;
const saxOffset = +3;

export const MultiviewPage = () => {
  const tromboneRef = useRef<InstrumentRef>(null);
  const trumpetRef = useRef<InstrumentRef>(null);
  const saxRef = useRef<InstrumentRef>(null);

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        padding: 8,
        height: "100%",
      }}
    >
      <Instrument
        ref={tromboneRef}
        label="Trombone"
        defaultAccidental="flat"
        offset={tromboneOffset}
        onChange={(sheet) => {
          trumpetRef.current?.updateValue(sheet);
          saxRef.current?.updateValue(sheet);
        }}
      />
      <Instrument
        ref={trumpetRef}
        label="Trompete"
        defaultAccidental="sharp"
        offset={trumpetOffset}
        onChange={(sheet) => {
          tromboneRef.current?.updateValue(sheet);
          saxRef.current?.updateValue(sheet);
        }}
      />
      <Instrument
        ref={saxRef}
        label="Sax"
        defaultAccidental="sharp"
        offset={saxOffset}
        onChange={(sheet) => {
          tromboneRef.current?.updateValue(sheet);
          trumpetRef.current?.updateValue(sheet);
        }}
      />
    </View>
  );
};
