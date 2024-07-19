import { Pressable, Text, View } from "react-native";
import { Key, KeySignature } from "../database/types";
import { backgroundGray, keyboardBackground, white } from "../theme/colors";
import { KeySelector, keySignatureMap } from "./KeySelector";

const keyboardMap: Record<KeySignature, string[]> = {
  ["♭♭♭♭♭♭♭"]: ["do♭", "re♭", "mi♭", "fa♭", "sol♭", "la♭", "si♭"],
  ["♭♭♭♭♭♭"]: ["do♭", "re♭", "mi♭", "fa", "sol♭", "la♭", "si♭"],
  ["♭♭♭♭♭"]: ["do", "re♭", "mi♭", "fa", "sol♭", "la♭", "si♭"],
  ["♭♭♭♭"]: ["do", "re♭", "mi♭", "fa", "sol", "la♭", "si♭"],
  ["♭♭♭"]: ["do", "re", "mi♭", "fa", "sol", "la♭", "si♭"],
  ["♭♭"]: ["do", "re", "mi♭", "fa", "sol", "la", "si♭"],
  ["♭"]: ["do", "re", "mi", "fa", "sol", "la", "si♭"],
  [" "]: ["do", "re", "mi", "fa", "sol", "la", "si"],
  ["♯"]: ["do", "re", "mi", "fa♯", "sol", "la", "si"],
  ["♯♯"]: ["do♯", "re", "mi", "fa♯", "sol", "la", "si"],
  ["♯♯♯"]: ["do♯", "re", "mi", "fa♯", "sol♯", "la", "si"],
  ["♯♯♯♯"]: ["do♯", "re♯", "mi", "fa♯", "sol♯", "la", "si"],
  ["♯♯♯♯♯"]: ["do♯", "re♯", "mi", "fa♯", "sol♯", "la♯", "si"],
  ["♯♯♯♯♯♯"]: ["do♯", "re♯", "mi♯", "fa♯", "sol♯", "la♯", "si"],
  ["♯♯♯♯♯♯♯"]: ["do♯", "re♯", "mi♯", "fa♯", "sol♯", "la♯", "si♯"],
};

const getKeySignature = (key: Key): KeySignature | undefined => {
  return keySignatureMap.find(
    (item) => item[1] === key || item[2] === key,
  )?.[0];
};

const KeyboardKey = ({
  value,
  onPress,
}: {
  value: string;
  onPress: (value: string) => void;
}) => {
  return (
    <Pressable
      onPress={() => onPress(value)}
      style={({ pressed }) => ({
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        backgroundColor: pressed ? backgroundGray : white,
      })}
    >
      <Text selectable={false}>{value}</Text>
    </Pressable>
  );
};

const NotesRow = ({
  notes,
  onPress,
}: {
  notes: string[];
  onPress: (value: string) => void;
}) => {
  return (
    <View style={{ flexDirection: "row", gap: 2, height: 32 }}>
      {notes.map((key) => (
        <KeyboardKey key={key} value={key} onPress={() => onPress(key)} />
      ))}
    </View>
  );
};

export const NotesKeyboard = ({
  keyValue,
  onChangeKey,
  onPressNote,
}: {
  keyValue: Key;
  onChangeKey: (value: Key) => void;
  onPressNote: (value: string) => void;
}) => {
  const keySignature = getKeySignature(keyValue);
  const keys = keySignature !== undefined ? keyboardMap[keySignature] : [];

  return (
    <View
      style={{
        padding: 8,
        gap: 2,
        backgroundColor: keyboardBackground,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <KeySelector onChange={onChangeKey}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 32,
              paddingHorizontal: 20,
              borderRadius: 999,
              backgroundColor: white,
            }}
          >
            <Text>{keyValue}</Text>
          </View>
        </KeySelector>
        <View style={{ width: 160 }}>
          <NotesRow notes={["♯", "♭"]} onPress={onPressNote} />
        </View>
      </View>
      <NotesRow
        notes={keys.map((s) => s.toUpperCase())}
        onPress={onPressNote}
      />
      <NotesRow
        notes={keys.map((s) => s[0].toUpperCase() + s.slice(1))}
        onPress={onPressNote}
      />
      <NotesRow notes={keys} onPress={onPressNote} />
    </View>
  );
};
