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

  const [value, setValue] = useState(sheet?.data ? formatSheet(sheet) : "");
  const [key, setKey] = useState(sheet?.key ? formatKey(sheet) : Key.Do);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const onPressNote = (value: string) => {
    setValue((prev) => {
      if ((value === "♭" || value === "♯") && prev.endsWith(" ")) {
        return `${prev.substring(0, prev.length - 1)}${value} `;
      } else {
        return `${prev}${value} `;
      }
    });
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
