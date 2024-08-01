import { Text, View } from "react-native";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { backgroundGray, textGray } from "../theme/colors";
import { Button } from "./Button";

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
      <View style={{ marginTop: 12, gap: 8 }}>
        {(
          [
            "Flauta",
            "Clarinete",
            "Sax Soprano",
            "Sax Alto",
            "Sax Tenor",
            "Trompete",
            "Trombone",
            "Tuba",
          ] as const
        ).map((item) => (
          <Button
            key={item}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingVertical: 20,
              paddingLeft: 20,
              gap: 20,
              backgroundColor:
                item === settings.instrument ? backgroundGray : undefined,
            }}
            onPress={() => {
              updateSettings({ instrument: item });
              onChange?.();
            }}
          >
            <InstrumentIcon instrument={item} />
            <Text style={{ fontSize: 20 }}>{item}</Text>
          </Button>
        ))}
      </View>
    </View>
  );
};
