import { Pressable, Text, View } from "react-native";
import { KeySignatures } from "../config";
import { buttonFeedback, keyboardBackground, white } from "../theme/colors";
import { KeySignatureSelect } from "./KeySignatureSelect";

const notesMapByKeySignature: Record<string, string[]> = {
  [KeySignatures["Do#"]]: ["do♯", "re♯", "mi♯", "fa♯", "sol♯", "la♯", "si♯"],
  [KeySignatures["Fa#"]]: ["do♯", "re♯", "mi♯", "fa♯", "sol♯", "la♯", "si"],
  [KeySignatures.Si]: ["do♯", "re♯", "mi", "fa♯", "sol♯", "la♯", "si"],
  [KeySignatures.Mi]: ["do♯", "re♯", "mi", "fa♯", "sol♯", "la", "si"],
  [KeySignatures.La]: ["do♯", "re", "mi", "fa♯", "sol♯", "la", "si"],
  [KeySignatures.Re]: ["do♯", "re", "mi", "fa♯", "sol", "la", "si"],
  [KeySignatures.Sol]: ["do", "re", "mi", "fa♯", "sol", "la", "si"],
  [KeySignatures.Do]: ["do", "re", "mi", "fa", "sol", "la", "si"],
  [KeySignatures.Fa]: ["do", "re", "mi", "fa", "sol", "la", "si♭"],
  [KeySignatures.Sib]: ["do", "re", "mi♭", "fa", "sol", "la", "si♭"],
  [KeySignatures.Mib]: ["do", "re", "mi♭", "fa", "sol", "la♭", "si♭"],
  [KeySignatures.Lab]: ["do", "re♭", "mi♭", "fa", "sol", "la♭", "si♭"],
  [KeySignatures.Reb]: ["do", "re♭", "mi♭", "fa", "sol♭", "la♭", "si♭"],
  [KeySignatures.Solb]: ["do♭", "re♭", "mi♭", "fa", "sol♭", "la♭", "si♭"],
};

const Key = ({
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
        <Key key={key} value={key} onPress={() => onPress(key)} />
      ))}
    </View>
  );
};

export const NotesKeyboard = ({
  keySignature,
  onChangeKeySignature,
  onPressNote,
}: {
  keySignature: string;
  onChangeKeySignature: (value: string) => void;
  onPressNote: (value: string) => void;
}) => {
  const keys = notesMapByKeySignature[keySignature] ?? [];

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
        <KeySignatureSelect
          value={keySignature}
          onChange={onChangeKeySignature}
        />
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
