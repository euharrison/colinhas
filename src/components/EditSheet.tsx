import { useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { KeySignatures } from "../config";
import { Sheet } from "../database/types";
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
  const myInstrument = useInstrument();

  const [value, setValue] = useState(sheet?.data ?? "");
  const [keySignature, setKeySignature] = useState(
    sheet?.keySignature || KeySignatures.Do,
  );
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

  const onChangeKeySignature = (value: string) => {
    setKeySignature(value);
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
        keySignature={keySignature}
        onChangeKeySignature={onChangeKeySignature}
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
            keySignature,
            instrument: sheet?.instrument ?? myInstrument,
            data: value,
          }}
        />
      </Dialog>
    </>
  );
};
