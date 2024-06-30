import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

const scales = [
  ["do♭", "re♭", "mi♭", "fa♭", "sol♭", "la♭", "si♭"],
  ["do♭", "re♭", "mi♭", "fa", "sol♭", "la♭", "si♭"],
  ["do", "re♭", "mi♭", "fa", "sol♭", "la♭", "si♭"],
  ["do", "re♭", "mi♭", "fa", "sol", "la♭", "si♭"],
  ["do", "re", "mi♭", "fa", "sol", "la♭", "si♭"],
  ["do", "re", "mi♭", "fa", "sol", "la", "si♭"],
  ["do", "re", "mi", "fa", "sol", "la", "si♭"],
  ["do", "re", "mi", "fa", "sol", "la", "si"],
  ["do", "re", "mi", "fa#", "sol", "la", "si"],
  ["do#", "re", "mi", "fa#", "sol", "la", "si"],
  ["do#", "re", "mi", "fa#", "sol#", "la", "si"],
  ["do#", "re#", "mi", "fa#", "sol#", "la", "si"],
  ["do#", "re#", "mi", "fa#", "sol#", "la#", "si"],
  ["do#", "re#", "mi#", "fa#", "sol#", "la#", "si"],
  ["do#", "re#", "mi#", "fa#", "sol#", "la#", "si#"],
];

const Key = ({
  children,
  onPress,
}: {
  children: string;
  onPress: (value: string) => void;
}) => {
  return (
    <Pressable
      onPress={() => onPress(children)}
      style={({ pressed }) => ({
        flexGrow: 1,
        flexBasis: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        backgroundColor: pressed ? "#ccc" : "white",
      })}
    >
      <Text selectable={false}>{children}</Text>
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
        <Key key={key} onPress={() => onPress(`${key} `)}>
          {key}
        </Key>
      ))}
    </View>
  );
};

export const NotesKeyboard = ({
  onPress,
}: {
  onPress: (value: string) => void;
}) => {
  const [scaleIndex, setScaleIndex] = useState(7);

  const keys = scales[scaleIndex];

  return (
    <View
      style={{
        padding: 8,
        gap: 2,
        backgroundColor: "#ddd",
      }}
    >
      <View style={{ flexDirection: "row", gap: 2, height: 28 }}>
        <Key onPress={() => onPress("♭ ")}>♭</Key>
        <Key
          onPress={() => {
            setScaleIndex((s) => Math.max(s - 1, 0));
            onPress("");
          }}
        >
          ↓ ♭
        </Key>
        <Key
          onPress={() => {
            setScaleIndex((s) => Math.min(s + 1, scales.length - 1));
            onPress("");
          }}
        >
          ↑ #
        </Key>
        <Key onPress={() => onPress("# ")}>#</Key>
      </View>
      <NotesRow notes={keys.map((s) => s.toUpperCase())} onPress={onPress} />
      <NotesRow
        notes={keys.map((s) => s[0].toUpperCase() + s.slice(1))}
        onPress={onPress}
      />
      <NotesRow notes={keys} onPress={onPress} />
    </View>
  );
};
