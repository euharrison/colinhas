import { Text, View } from "react-native";
import { useAccidental } from "../hooks/useAccidental";
import { useUpdateAccidental } from "../hooks/useUpdateAccidental";
import { RadioField } from "./RadioField";

export const AccidentalInput = () => {
  const accidental = useAccidental();
  const updateAccidental = useUpdateAccidental();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Text style={{ color: "#999" }}>Visualizar em: </Text>
      <RadioField
        color="#999"
        checked={accidental === "sharp"}
        onChange={() => updateAccidental("sharp")}
      >
        <Text style={{ color: "#999" }}>♯</Text>
      </RadioField>
      <RadioField
        color="#999"
        checked={accidental === "flat"}
        onChange={() => updateAccidental("flat")}
      >
        <Text style={{ color: "#999" }}>♭</Text>
      </RadioField>
    </View>
  );
};
