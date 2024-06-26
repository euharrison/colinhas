import { useState } from "react";
import { Pressable, Text, View } from "react-native";

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
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        backgroundColor: pressed ? "#ccc" : undefined,
      })}
    >
      <Text>{children}</Text>
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
    <View style={{ flexDirection: "row", gap: 1, height: 32 }}>
      {notes.map((key) => (
        <Key onPress={() => onPress(`${key} `)} key={key}>
          {key}
        </Key>
      ))}
    </View>
  );
};

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

export const NotesKeyboard = ({
  onPress,
}: {
  onPress: (value: string) => void;
}) => {
  const [scaleIndex, setScaleIndex] = useState(7);

  const keys = scales[scaleIndex];

  return (
    <View style={{ marginBottom: 8, gap: 1 }}>
      <View style={{ flexDirection: "row", gap: 1, height: 28 }}>
        <Key
          onPress={() => {
            setScaleIndex((s) => Math.max(s - 1, 0));
          }}
        >
          ↓ ♭
        </Key>
        <Key
          onPress={() => {
            setScaleIndex((s) => Math.min(s + 1, scales.length - 1));
          }}
        >
          ↑ #
        </Key>
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
