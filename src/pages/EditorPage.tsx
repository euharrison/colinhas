import { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { KeyboardLayout } from "../components/KeyboardLayout";
import { NotesKeyboard } from "../components/NotesKeyboard";

export const EditorPage = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef<TextInput>(null);

  const onPressNoteKeyboard = (value: string) => {
    setValue((prev) => `${prev}${value}`);
    inputRef.current?.focus();
  };

  return (
    <KeyboardLayout>
      <View style={{ flex: 1, padding: 8, gap: 4 }}>
        <Text style={{ fontSize: 20 }}>Editor</Text>
        <View style={{ flex: 1 }}>
          <TextInput
            ref={inputRef}
            style={{
              paddingHorizontal: 4,
              paddingVertical: 8,
              borderWidth: 1,
              borderRadius: 4,
              flex: 1,
            }}
            multiline
            autoComplete="off"
            autoCorrect={false}
            autoFocus
            textAlignVertical="top"
            value={value}
            onChangeText={(newValue) => {
              setValue(newValue);
            }}
          />
        </View>
        <NotesKeyboard onPress={onPressNoteKeyboard} />
      </View>
    </KeyboardLayout>
  );
};
