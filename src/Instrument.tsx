import { forwardRef, useImperativeHandle, useState } from "react";
import { AccidentalInput } from "./AccidentalInput";
import { getOutput, getSheet } from "./lib";
import { Accidental } from "./types";
import { Text, TextInput, View } from "react-native";

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
    <View style={{ flexGrow: 1, flexBasis: 1 }}>
      <Text style={{ fontSize: 20 }}>{label}</Text>
      <AccidentalInput
        value={accidental}
        onChange={(newAccidental) => {
          setAccidental(newAccidental);
          const sheet = getSheet(value, offset);
          const output = getOutput(sheet, offset, newAccidental);
          setValue(output);
        }}
      />
      <TextInput
        style={{
          paddingHorizontal: 4,
          paddingVertical: 8,
          borderWidth: 1,
          borderRadius: 4,
          flexGrow: 1,
        }}
        multiline
        value={value}
        onChangeText={(newValue) => {
          setValue(newValue);
          const sheet = getSheet(newValue, offset);
          onChange(sheet);
        }}
      />
    </View>
  );
});
