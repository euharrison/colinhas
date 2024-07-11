import { Pressable, Text, View } from "react-native";
import { Key } from "../config";
import { buttonFeedback, keyboardBackground, white } from "../theme/colors";
import { KeySelector } from "./KeySelector";

const notesMapByKey: Record<string, string[]> = {
  [Key["Do#"]]: ["do♯", "re♯", "mi♯", "fa♯", "sol♯", "la♯", "si♯"],
  [Key["Fa#"]]: ["do♯", "re♯", "mi♯", "fa♯", "sol♯", "la♯", "si"],
  [Key.Si]: ["do♯", "re♯", "mi", "fa♯", "sol♯", "la♯", "si"],
  [Key.Mi]: ["do♯", "re♯", "mi", "fa♯", "sol♯", "la", "si"],
  [Key.La]: ["do♯", "re", "mi", "fa♯", "sol♯", "la", "si"],
  [Key.Re]: ["do♯", "re", "mi", "fa♯", "sol", "la", "si"],
  [Key.Sol]: ["do", "re", "mi", "fa♯", "sol", "la", "si"],
  [Key.Do]: ["do", "re", "mi", "fa", "sol", "la", "si"],
  [Key.Fa]: ["do", "re", "mi", "fa", "sol", "la", "si♭"],
  [Key.Sib]: ["do", "re", "mi♭", "fa", "sol", "la", "si♭"],
  [Key.Mib]: ["do", "re", "mi♭", "fa", "sol", "la♭", "si♭"],
  [Key.Lab]: ["do", "re♭", "mi♭", "fa", "sol", "la♭", "si♭"],
  [Key.Reb]: ["do", "re♭", "mi♭", "fa", "sol♭", "la♭", "si♭"],
  [Key.Solb]: ["do♭", "re♭", "mi♭", "fa", "sol♭", "la♭", "si♭"],
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
        backgroundColor: pressed ? buttonFeedback : white,
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
  keyValue: string;
  onChangeKey: (value: string) => void;
  onPressNote: (value: string) => void;
}) => {
  const keys = notesMapByKey[keyValue] ?? [];

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
        <KeySelector value={keyValue} onChange={onChangeKey} />
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
