import { useMemo, useRef } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Key, KeySignature } from "../database/types";
import { backgroundGray, keyboardBackground, white } from "../theme/colors";
import { FileUploadButton } from "./FileUploadButton";
import { KeySelector, keySignatureMap } from "./KeySelector";

export const specialChars = ['"', "/", "_", "♯", "♭"];

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

export const NotesKeyboard = ({
  keyValue,
  onChangeKey,
  onPressNote,
}: {
  keyValue?: Key;
  onChangeKey: (value?: Key) => void;
  onPressNote: (value: string) => void;
}) => {
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);

  const notes = useMemo(() => {
    const keySignature = keyValue ? getKeySignature(keyValue) : " ";
    const scale = keySignature !== undefined ? keyboardMap[keySignature] : [];
    return [
      ...scale,
      ...scale.map((s) => s[0].toUpperCase() + s.slice(1)),
      ...scale.map((s) => s.toUpperCase()),
    ];
  }, [keyValue]);

  const keyWidth = width / 8 - 3;
  const margin = 8;

  return (
    <View
      style={{
        paddingVertical: margin,
        gap: 2,
        backgroundColor: keyboardBackground,
      }}
    >
      <View
        style={{
          paddingHorizontal: margin,
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          height: 32,
        }}
      >
        <KeySelector onChange={onChangeKey}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              paddingHorizontal: 16,
              borderRadius: 999,
              backgroundColor: white,
            }}
          >
            <Text>{keyValue ?? "Tom"}</Text>
          </View>
        </KeySelector>
        <FileUploadButton onPress={(url) => onPressNote(url)} />
        <View style={{ flexDirection: "row", gap: 2 }}>
          {specialChars.map((key) => (
            <Pressable
              key={key}
              onPress={() => onPressNote(key)}
              style={({ pressed }) => ({
                height: "100%",
                width: keyWidth,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                backgroundColor: pressed ? backgroundGray : white,
              })}
            >
              <Text selectable={false}>{key}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <ScrollView
        ref={scrollRef}
        onContentSizeChange={(w) => {
          scrollRef.current?.scrollTo({ x: (w - width) / 2, animated: false });
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: margin,
          flexDirection: "row",
          gap: 2,
        }}
      >
        {notes.map((key) => (
          <Pressable
            key={key}
            onPress={() => onPressNote(key)}
            style={({ pressed }) => ({
              height: 44,
              width: keyWidth,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              backgroundColor: pressed ? backgroundGray : white,
            })}
          >
            <Text selectable={false}>{key}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};
