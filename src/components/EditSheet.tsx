import { useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { Key } from "../config";
import { Sheet } from "../database/types";
import { useFormatKey } from "../hooks/useFormatKey";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { useInstrument } from "../hooks/useInstrument";
import { ArrowForwardIcon } from "../icons/ArrowForwardIcon";
import { alert } from "../services/alert";
import { textGray } from "../theme/colors";
import { pagePadding } from "../theme/sizes";
import { Dialog } from "./Dialog";
import { FAB } from "./FAB";
import { NotesKeyboard } from "./NotesKeyboard";
import { SaveSheetForm } from "./SaveSheetForm";

export const EditSheet = ({ sheet }: { sheet?: Sheet }) => {
  const instrument = useInstrument();
  const formatSheet = useFormatSheet();
  const formatKey = useFormatKey();

  const [key, setKey] = useState(sheet?.key ? formatKey(sheet) : Key.Do);
  const [value, setValue] = useState(sheet?.data ? formatSheet(sheet) : "");
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const [saveModalVisible, setSaveModalVisible] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const onPressNote = (note: string) => {
    const { start, end } = selection;
    const isCursorAtTheEnd = end - start === 0 && end === value.length;

    if (isCursorAtTheEnd) {
      if ((note === "♭" || note === "♯") && value.endsWith(" ")) {
        setValue(`${value.slice(0, -1)}${note} `);
      } else {
        setValue(`${value}${note} `);
      }
    } else {
      setValue(`${value.slice(0, start)}${note}${value.slice(end)}`);
      const newPosition = start + note.length;
      setSelection({ start: newPosition, end: newPosition });
    }

    inputRef.current?.focus();
  };

  const onChangeKey = (value: string) => {
    setKey(value);
    inputRef.current?.focus();
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <TextInput
          ref={inputRef}
          style={{
            padding: pagePadding,
            flex: 1,
            fontSize: 20,
          }}
          placeholder="Do Re Mi Fa..."
          placeholderTextColor={textGray}
          multiline
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          autoFocus
          textAlignVertical="top"
          value={value}
          selection={selection}
          onSelectionChange={(e) => {
            setSelection(e.nativeEvent.selection);
          }}
          onChangeText={(newValue) => {
            setValue(newValue);
          }}
        />
        <FAB
          onPress={() => {
            if (!value) {
              alert("Escreva sua cola antes de salvar");
            } else {
              setSaveModalVisible(true);
            }
          }}
        >
          <ArrowForwardIcon />
        </FAB>
      </View>
      <NotesKeyboard
        keyValue={key}
        onChangeKey={onChangeKey}
        onPressNote={onPressNote}
      />
      <Dialog
        title="Salvar"
        visible={saveModalVisible}
        onRequestClose={() => setSaveModalVisible(false)}
      >
        <SaveSheetForm
          id={sheet?.id}
          defaultValues={{
            ...sheet,
            key,
            instrument,
            data: value,
          }}
        />
      </Dialog>
    </>
  );
};
