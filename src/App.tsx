import { useState } from "react";
import styles from "./App.module.css";
import { Instrument } from "./Instrument";
import { getOutput, outputDictionary } from "./lib";
import { Accidental } from "./types";

// const testValue = `20 25 32 37 44 49 49
// 24 19
// 20 20 21 21 21 21 19..
// 23__ 35.. 36`;

const tromboneOffset = 0;
const trumpetOffset = -2;
const saxOffset = +3;

function App() {
  const [indexedSheet, setIndexedSheet] = useState("");

  const [tromboneAccidental, setTromboneAccidental] =
    useState<Accidental>("flat");
  const [trumpetAccidental, setTrumpetAccidental] =
    useState<Accidental>("sharp");
  const [saxAccidental, setSaxAccidental] = useState<Accidental>("sharp");

  return (
    <div className={styles.container}>
      <Instrument
        label="Trombone"
        accidental={tromboneAccidental}
        offset={tromboneOffset}
        value={getOutput(
          indexedSheet,
          outputDictionary[tromboneAccidental],
          tromboneOffset,
        )}
        onInput={setIndexedSheet}
        onChangeAccidental={setTromboneAccidental}
      />
      <Instrument
        label="Trompete (Do)"
        accidental={trumpetAccidental}
        offset={trumpetOffset}
        value={getOutput(
          indexedSheet,
          outputDictionary[trumpetAccidental],
          trumpetOffset,
        )}
        onInput={setIndexedSheet}
        onChangeAccidental={setTrumpetAccidental}
      />
      <Instrument
        label="Sax (Mi♭)"
        accidental={saxAccidental}
        offset={saxOffset}
        value={getOutput(
          indexedSheet,
          outputDictionary[saxAccidental],
          saxOffset,
        )}
        onInput={setIndexedSheet}
        onChangeAccidental={setSaxAccidental}
      />
    </div>
  );
}

export default App;
