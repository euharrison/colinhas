import { useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { KeyboardLayout } from "./KeyboardLayout";
import { NotesKeyboard } from "./NotesKeyboard";

export const Editor = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef<TextInput>(null);

  const onPressNoteKeyboard = (value: string) => {
    setValue((prev) => `${prev}${value}`);
    inputRef.current?.focus();
  };

  return (
    <>
      <KeyboardLayout>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 8,
            gap: 4,
            backgroundColor: "white",
          }}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              ref={inputRef}
              style={{
                padding: 8,
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
          <View style={{ margin: 0, padding: 0 }}>
            <NotesKeyboard onPress={onPressNoteKeyboard} />
          </View>
        </View>
      </KeyboardLayout>
    </>
  );
};
