import { Text, View } from "react-native";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { textGray } from "../theme/colors";
import { RadioField } from "./RadioField";

export const AccidentalInput = () => {
  const { settings, updateSettings } = useLocalSettings();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Text style={{ color: textGray }}>Visualizar acidentes como: </Text>
      <RadioField
        color={textGray}
        checked={settings.accidental === "sharp"}
        onChange={() => updateSettings({ accidental: "sharp" })}
      >
        <Text style={{ color: textGray }}>♯</Text>
      </RadioField>
      <RadioField
        color={textGray}
        checked={settings.accidental === "flat"}
        onChange={() => updateSettings({ accidental: "flat" })}
      >
        <Text style={{ color: textGray }}>♭</Text>
      </RadioField>
    </View>
  );
};
