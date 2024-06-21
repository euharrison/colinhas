import { forwardRef, useImperativeHandle, useState } from "react";
import { AccidentalInput } from "./AccidentalInput";
import styles from "./Instrument.module.css";
import { getOutput, getSheet } from "./lib";
import { Accidental } from "./types";

export type InstrumentRef = {
  updateValue: (sheet: string) => void;
};

export const Instrument = forwardRef<
  InstrumentRef,
  {
    label: string;
    defaultAccidental: Accidental;
    offset: number;
    onChange: (sheet: string) => void;
  }
>(({ label, defaultAccidental, offset, onChange }, ref) => {
  const [value, setValue] = useState("");
  const [accidental, setAccidental] = useState<Accidental>(defaultAccidental);

  useImperativeHandle(
    ref,
    () => ({
      updateValue: (sheet: string) => {
        const output = getOutput(sheet, offset, accidental);
        setValue(output);
      },
    }),
    [accidental, offset],
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{label}</h2>
      <AccidentalInput
        value={accidental}
        onChange={(newAccidental) => {
          setAccidental(newAccidental);
          const sheet = getSheet(value, offset);
          const output = getOutput(sheet, offset, newAccidental);
          setValue(output);
        }}
      />
      <textarea
        className={styles.textarea}
        value={value}
        onInput={(e) => {
          const newValue = e.currentTarget.value;
          setValue(newValue);
          const sheet = getSheet(newValue, offset);
          onChange(sheet);
        }}
      />
    </div>
  );
});
