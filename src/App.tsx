import { useRef } from "react";
import styles from "./App.module.css";
import { Instrument, InstrumentRef } from "./Instrument";

// const testValue = `20 25 32 37 44 49 49
// 24 19
// 20 20 21 21 21 21 19..
// 23__ 35.. 36`;

const tromboneOffset = 0;
const trumpetOffset = -2;
const saxOffset = +3;

function App() {
  const tromboneRef = useRef<InstrumentRef>(null);
  const trumpetRef = useRef<InstrumentRef>(null);
  const saxRef = useRef<InstrumentRef>(null);

  return (
    <div className={styles.container}>
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
    </div>
  );
}

export default App;
