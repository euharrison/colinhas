import { ReactNode, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { Key, KeySignature, MajorKey, MinorKey } from "../database/types";
import { backgroundGray, borderGray, white } from "../theme/colors";
import { Dialog, DialogRef } from "./Dialog";

export const keySignatureMap: [KeySignature, MajorKey, MinorKey][] = [
  ["♭♭♭♭♭♭♭", "Do♭ Maior", "La♭ menor"],
  ["♭♭♭♭♭♭", "Sol♭ Maior", "Mi♭ menor"],
  ["♭♭♭♭♭", "Re♭ Maior", "Si♭ menor"],
  ["♭♭♭♭", "La♭ Maior", "Fa menor"],
  ["♭♭♭", "Mi♭ Maior", "Do menor"],
  ["♭♭", "Si♭ Maior", "Sol menor"],
  ["♭", "Fa Maior", "Re menor"],
  [" ", "Do Maior", "La menor"],
  ["♯", "Sol Maior", "Mi menor"],
  ["♯♯", "Re Maior", "Si menor"],
  ["♯♯♯", "La Maior", "Fa♯ menor"],
  ["♯♯♯♯", "Mi Maior", "Do♯ menor"],
  ["♯♯♯♯♯", "Si Maior", "Sol♯ menor"],
  ["♯♯♯♯♯♯", "Fa♯ Maior", "Re♯ menor"],
  ["♯♯♯♯♯♯♯", "Do♯ Maior", "La♯ menor"],
];

const KeyButton = ({
  children,
  onPress,
}: {
  children: string;
  onPress: () => void;
}) => {
  return (
    <Pressable
      style={({ pressed }) => ({
        flex: 1,
        justifyContent: "center",
        height: 32,
        paddingHorizontal: 8,
        backgroundColor: pressed ? backgroundGray : white,
      })}
      onPress={onPress}
    >
      <Text style={{ fontSize: 14 }}>{children}</Text>
    </Pressable>
  );
};

export const KeySelector = ({
  children,
  onChange,
}: {
  children: ReactNode;
  onChange: (value: Key) => void;
}) => {
  const dialogRef = useRef<DialogRef>(null);

  const onPress = (value: Key) => {
    onChange(value);
    dialogRef.current?.close();
  };

  return (
    <>
      <Pressable
        onPress={() => {
          dialogRef.current?.open();
        }}
      >
        {children}
      </Pressable>
      <Dialog ref={dialogRef} title="Tom">
        <View>
          {keySignatureMap.map(([signature, major, minor]) => (
            <View
              key={Math.random()}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: borderGray,
              }}
            >
              <KeyButton onPress={() => onPress(major)}>{signature}</KeyButton>
              <KeyButton onPress={() => onPress(major)}>{major}</KeyButton>
              <KeyButton onPress={() => onPress(minor)}>{minor}</KeyButton>
            </View>
          ))}
        </View>
      </Dialog>
    </>
  );
};
