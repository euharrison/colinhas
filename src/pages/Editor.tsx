import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { NotesKeyboard } from "../components/NotesKeyboard";

export const Editor = () => {
  const [value, setValue] = useState("");

  const onPressNoteKeyboard = (value: string) => {
    setValue((prev) => `${prev}${value}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, padding: 8, gap: 4 }}
    >
      <Text style={{ fontSize: 20 }}>Editor</Text>
      <View style={{ flex: 1 }}>
        <TextInput
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
          value={value}
          onChangeText={(newValue) => {
            setValue(newValue);
          }}
        />
      </View>
      <NotesKeyboard onPress={onPressNoteKeyboard} />
    </KeyboardAvoidingView>
  );
};
