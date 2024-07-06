import { Text, View } from "react-native";
import { useAccidental } from "../hooks/useAccidental";
import { useUpdateAccidental } from "../hooks/useUpdateAccidental";
import { textGray } from "../theme/colors";
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
      <Text style={{ color: textGray }}>Visualizar em: </Text>
      <RadioField
        color={textGray}
        checked={accidental === "sharp"}
        onChange={() => updateAccidental("sharp")}
      >
        <Text style={{ color: textGray }}>♯</Text>
      </RadioField>
      <RadioField
        color={textGray}
        checked={accidental === "flat"}
        onChange={() => updateAccidental("flat")}
      >
        <Text style={{ color: textGray }}>♭</Text>
      </RadioField>
    </View>
  );
};
