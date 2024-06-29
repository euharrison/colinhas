import { router } from "expo-router";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

export const Header = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => {
  return (
    <View
      style={{
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
      }}
    >
      <Text>{title}</Text>
      <Pressable
        style={({ pressed }) => ({
          position: "absolute",
          top: 0,
          left: 0,
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
          position: "absolute",
          top: 0,
          right: 0,
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </View>
    </View>
  );
};
