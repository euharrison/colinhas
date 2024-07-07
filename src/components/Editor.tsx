import { useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { Sheet } from "../database/types";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { ArrowForwardIcon } from "../icons/ArrowForwardIcon";
import { alert } from "../services/alert";
import { pagePadding } from "../theme/sizes";
import { FAB } from "./FAB";
import { NotesKeyboard } from "./NotesKeyboard";
import { SaveModal } from "./SaveModal";

export const Editor = ({ sheet }: { sheet?: Sheet }) => {
  const formatSheet = useFormatSheet();
  const [value, setValue] = useState(sheet ? formatSheet(sheet) : "");
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const onPressNoteKeyboard = (value: string) => {
    setValue((prev) => {
      if ((value === "♭" || value === "♯") && prev.endsWith(" ")) {
        return `${prev.substring(0, prev.length - 1)}${value} `;
      } else {
        return `${prev}${value} `;
      }
    });
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
      <NotesKeyboard onPress={onPressNoteKeyboard} />
      <SaveModal
        sheet={sheet}
        data={value}
        visible={saveModalVisible}
        onRequestClose={() => setSaveModalVisible(false)}
      />
    </>
  );
};
