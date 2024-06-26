import { Text, View } from "react-native";
import { RadioField } from "./RadioField";
import { Accidental } from "./types";

export const AccidentalInput = ({
  value,
  onChange,
}: {
  value: Accidental;
  onChange: (value: Accidental) => void;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginVertical: 4,
      }}
    >
      <RadioField
        checked={value === "sharp"}
        onChange={() => onChange("sharp")}
      >
        <Text>#</Text>
      </RadioField>
      <RadioField checked={value === "flat"} onChange={() => onChange("flat")}>
        <Text>♭</Text>
      </RadioField>
    </View>
  );
};
