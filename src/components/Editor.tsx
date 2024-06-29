import { useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Sheet } from "../database/types";
import { KeyboardLayout } from "./KeyboardLayout";
import { NotesKeyboard } from "./NotesKeyboard";
import { SaveSheetModal } from "./SaveModal";

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
          </View>
          <View>
            <Pressable
              style={({ pressed }) => ({
                height: 50,
                width: 50,
                borderRadius: 50,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: pressed ? "#ccc" : undefined,
                alignSelf: "flex-end",
              })}
              onPress={() => {
                setSaveModalVisible(true);
              }}
            >
              <Text>{">"}</Text>
            </Pressable>
          </View>
          <View style={{ margin: 0, padding: 0 }}>
            <NotesKeyboard onPress={onPressNoteKeyboard} />
          </View>
        </View>
      </KeyboardLayout>
      <SaveSheetModal
        sheet={sheet}
        data={value}
        visible={saveModalVisible}
        onRequestClose={() => setSaveModalVisible(false)}
      />
    </>
  );
};
