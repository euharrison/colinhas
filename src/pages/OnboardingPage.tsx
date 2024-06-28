import { Pressable, Text, View } from "react-native";
import { useModalPage } from "../hooks/useModalPage";

export function OnboardingPage() {
  useModalPage();

  return (
    <View style={{ padding: 20, gap: 20 }}>
      <View>
        <Text style={{ fontSize: 20 }}>Escolha seu instrumento</Text>
        <Text>Você poderá trocar depois qualquer coisa</Text>
      </View>
      <View style={{ gap: 8 }}>
        {["Trombone", "Trompete", "Sax"].map((item) => (
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
              // TODO
            }}
          >
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
