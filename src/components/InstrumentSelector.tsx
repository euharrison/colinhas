import { Pressable, Text, View } from "react-native";
import { useUpdateInstrument } from "../hooks/useUpdateInstrument";
import { SaxIcon } from "../icons/SaxIcon";
import { TromboneIcon } from "../icons/TromboneIcon";
import { TrumpetIcon } from "../icons/TrumpetIcon";
import { TubaIcon } from "../icons/TubaIcon";
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
            icon: <SaxIcon />,
          },
          {
            label: "Trompete",
            icon: <TrumpetIcon />,
          },
          {
            label: "Trombone",
            icon: <TromboneIcon />,
          },
          {
            label: "Tuba",
            icon: <TubaIcon />,
          },
        ].map(({ label, icon }) => (
          <Pressable
            key={label}
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
              updateInstrument(label);
              onChange?.();
            }}
          >
            {icon}
            <Text style={{ fontSize: 20 }}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
