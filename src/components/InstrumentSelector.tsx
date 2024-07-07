import { Pressable, Text, View } from "react-native";
import { Instrument } from "../config";
import { useUpdateInstrument } from "../hooks/useUpdateInstrument";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { buttonFeedback, textGray } from "../theme/colors";

export const InstrumentSelector = ({ onChange }: { onChange?: () => void }) => {
  const updateInstrument = useUpdateInstrument();

  return (
    <View>
      <Text style={{ fontSize: 20 }}>Escolha seu instrumento</Text>
      <Text style={{ color: textGray }}>
        Você poderá trocar depois se preferir
      </Text>
      <View style={{ marginTop: 20, gap: 8 }}>
        {[
          {
            label: "Sax",
            value: Instrument.Sax,
          },
          {
            label: "Trompete",
            value: Instrument.Trumpet,
          },
          {
            label: "Trombone",
            value: Instrument.Trombone,
          },
          {
            label: "Tuba",
            value: Instrument.Tuba,
          },
        ].map(({ value, label }) => (
          <Pressable
            key={value}
            style={({ pressed }) => ({
              borderRadius: 4,
              borderWidth: 1,
              paddingVertical: 20,
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
              gap: 20,
              backgroundColor: pressed ? buttonFeedback : undefined,
            })}
            onPress={() => {
              updateInstrument(value);
              onChange?.();
            }}
          >
            <InstrumentIcon instrument={value} />
            <Text style={{ fontSize: 20 }}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
