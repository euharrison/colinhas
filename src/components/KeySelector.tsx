import { useRef } from "react";
import { Pressable, PressableProps, Text, View } from "react-native";
import { Key } from "../database/types";
import { backgroundGray, borderGray, white } from "../theme/colors";
import { keySignatureMap } from "../utils";
import { Dialog, DialogRef } from "./Dialog";

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
  onChange,
  ...props
}: {
  onChange: (value: Key) => void;
} & PressableProps) => {
  const dialogRef = useRef<DialogRef>(null);

  const onPress = (value: Key) => {
    onChange(value);
    dialogRef.current?.close();
  };

  return (
    <>
      <Pressable
        {...props}
        onPress={() => {
          dialogRef.current?.open();
        }}
      />
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
