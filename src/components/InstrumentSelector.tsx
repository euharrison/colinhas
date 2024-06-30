import { Pressable, Text, View } from "react-native";
import { useUpdateInstrument } from "../hooks/useUpdateInstrument";

export const InstrumentSelector = ({ onChange }: { onChange?: () => void }) => {
  const updateInstrument = useUpdateInstrument();

  return (
    <View>
      <Text style={{ fontSize: 20 }}>Escolha seu instrumento</Text>
      <Text style={{ color: "#999" }}>
        Você poderá trocar depois se preferir
      </Text>
      <View style={{ marginTop: 20, gap: 8 }}>
        {["Sax", "Trompete", "Trombone", "Tuba"].map((item) => (
          <Pressable
            key={item}
            style={({ pressed }) => ({
              borderRadius: 4,
              borderWidth: 1,
              paddingVertical: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: pressed ? "#ccc" : undefined,
            })}
            onPress={() => {
              updateInstrument(item);
              onChange?.();
            }}
          >
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
