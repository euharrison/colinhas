import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export const Header = ({ title }: { title: string }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Pressable
        style={({ pressed }) => ({
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: pressed ? "#ccc" : undefined,
        })}
        onPress={() => router.back()}
      >
        <Text>{"<"}</Text>
      </Pressable>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text>{title}</Text>
      </View>
      <Pressable
        style={({ pressed }) => ({
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: pressed ? "#ccc" : undefined,
        })}
      >
        <Text>...</Text>
      </Pressable>
    </View>
  );
};
