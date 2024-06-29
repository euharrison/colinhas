import { useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Sheet } from "../database/types";
import { KeyboardLayout } from "./KeyboardLayout";
import { NotesKeyboard } from "./NotesKeyboard";
import { SaveModal } from "./SaveModal";

export const Editor = ({ sheet }: { sheet?: Sheet }) => {
  const [value, setValue] = useState(sheet?.data ?? "");
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const onPressNoteKeyboard = (value: string) => {
    setValue((prev) => `${prev}${value}`);
    inputRef.current?.focus();
  };

  return (
    <>
      <KeyboardLayout>
        <View style={{ flex: 1 }}>
          <TextInput
            ref={inputRef}
            style={{
              marginHorizontal: 20,
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
          <Pressable
            style={({ pressed }) => ({
              height: 50,
              width: 50,
              borderRadius: 50,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: pressed ? "#ccc" : "#ffffffaa",
              position: "absolute",
              right: 20,
              bottom: 0,
            })}
            onPress={() => {
              setSaveModalVisible(true);
            }}
          >
            <Text>{">"}</Text>
          </Pressable>
        </View>
        <View style={{ paddingHorizontal: 8, paddingVertical: 20 }}>
          <NotesKeyboard onPress={onPressNoteKeyboard} />
        </View>
      </KeyboardLayout>
      <SaveModal
        sheet={sheet}
        data={value}
        visible={saveModalVisible}
        onRequestClose={() => setSaveModalVisible(false)}
      />
    </>
  );
};
