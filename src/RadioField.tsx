import { ReactNode } from "react";
import { Pressable, View } from "react-native";

export const RadioField = ({
  children,
  checked,
  onChange,
}: {
  children: ReactNode;
  checked: boolean;
  onChange: (newValue: boolean) => void;
}) => {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
    >
      <View
        style={{
          height: 12,
          width: 12,
          borderRadius: 6,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checked && (
          <View
            style={{
              height: 6,
              width: 6,
              borderRadius: 6,
              backgroundColor: "#000",
            }}
          />
        )}
      </View>
      {children}
    </Pressable>
  );
};
