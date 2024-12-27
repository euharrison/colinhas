import { Pressable, Text, View } from "react-native";
import { borderGray } from "../theme/colors";

export const Checkbox = ({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) => {
  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
      onPress={() => onChange(!value)}
    >
      <View
        style={{
          width: 16,
          height: 16,
          borderWidth: 1,
          borderColor: borderGray,
          borderRadius: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {value && <Text>✓</Text>}
      </View>
      {label && <Text>{label}</Text>}
    </Pressable>
  );
};
