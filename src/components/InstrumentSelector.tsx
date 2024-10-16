import { Text, View } from "react-native";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { textGray } from "../theme/colors";
import { InstrumentList } from "./InstrumentList";

export const InstrumentSelector = ({ onChange }: { onChange?: () => void }) => {
  const { settings, updateSettings } = useLocalSettings();

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontSize: 20 }}>Escolha seu instrumento</Text>
      <Text style={{ color: textGray }}>
        Assim podemos transpor automaticamente as colas que não estão no tom do
        seu instrumento.
      </Text>
      <Text style={{ color: textGray }}>
        Você poderá trocar depois se preferir.
      </Text>
      <View style={{ marginTop: 12 }}>
        <InstrumentList
          selectedItem={settings.instrument}
          onSelect={(instrument) => {
            updateSettings({ instrument });
            onChange?.();
          }}
        />
      </View>
    </View>
  );
};
