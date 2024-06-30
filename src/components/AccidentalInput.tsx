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
        marginVertical: 4,
        alignSelf: "flex-end",
        opacity: 0.5,
      }}
    >
      <RadioField
        checked={accidental === "sharp"}
        onChange={() => updateAccidental("sharp")}
      >
        <Text>#</Text>
      </RadioField>
      <RadioField
        checked={accidental === "flat"}
        onChange={() => updateAccidental("flat")}
      >
        <Text>♭</Text>
      </RadioField>
    </View>
  );
};
