import { ReactNode } from "react";
import { Pressable, View } from "react-native";

export const RadioField = ({
  children,
  checked,
  color,
  onChange,
}: {
  children: ReactNode;
  checked: boolean;
  color?: string;
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
          borderColor: color,
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
              backgroundColor: color ?? "#000",
            }}
          />
        )}
      </View>
      {children}
    </Pressable>
  );
};
