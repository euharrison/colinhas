import { Pressable, Text, View } from "react-native";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { backgroundGray, borderGray, textGray } from "../theme/colors";

export const InstrumentSelector = ({ onChange }: { onChange?: () => void }) => {
  const { updateSettings } = useLocalSettings();

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
          <Pressable
            key={item}
            style={({ pressed }) => ({
              borderRadius: 4,
              borderWidth: 1,
              borderColor: borderGray,
              paddingVertical: 20,
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
              gap: 20,
              backgroundColor: pressed ? backgroundGray : undefined,
            })}
            onPress={() => {
              updateSettings({ instrument: item });
              if (item === "Trombone" || item === "Tuba") {
                updateSettings({ accidental: "flat" });
              } else {
                updateSettings({ accidental: "sharp" });
              }
              onChange?.();
            }}
          >
            <InstrumentIcon instrument={item} />
            <Text style={{ fontSize: 20 }}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
