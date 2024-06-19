import { AccidentalInput } from "./AccidentalInput";
import styles from "./Instrument.module.css";
import { getIndexedSheet } from "./lib";
import { Accidental } from "./types";

export const Instrument = ({
  label,
  accidental,
  offset,
  value,
  onChangeAccidental,
  onInput,
}: {
  label: string;
  accidental: Accidental;
  offset: number;
  value: string;
  onChangeAccidental: (value: Accidental) => void;
  onInput: (indexedSheet: string) => void;
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{label}</h2>
      <AccidentalInput value={accidental} onChange={onChangeAccidental} />
      <textarea
        className={styles.textarea}
        value={value}
        onInput={(e) => {
          const sheet = getIndexedSheet(e.currentTarget.value, offset);
          onInput(sheet);
        }}
      />
    </div>
  );
};
