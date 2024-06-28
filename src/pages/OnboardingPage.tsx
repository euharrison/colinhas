import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useModalPage } from "../hooks/useModalPage";

export function OnboardingPage() {
  useModalPage({ gestureEnabled: false });

  return (
    <View style={{ padding: 20, gap: 20 }}>
      <View>
        <Text style={{ fontSize: 20 }}>Escolha seu instrumento</Text>
        <Text>Você poderá trocar depois se preferir</Text>
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
              router.back();
            }}
          >
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
