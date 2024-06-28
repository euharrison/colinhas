import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Header } from "../components/Header";

// TODO
const sampleData = `P trombone fica….

Base.
Do Do Re# Re#
Repete até a segunda parte

Do Do
Sib Lab Sib Sib
Lab Sib Do
Sib Lab Sib Sib
Lab Sib Do….

Lab Sol Fa
5x

Volta tudo`;

export const ViewPage = () => {
  const { user, sheet } = useLocalSearchParams();

  return (
    <>
      <Header title={String(sheet)} />
      <View style={{ flexDirection: "row", padding: 8, gap: 8 }}>
        <Link
          href={`/${user}/${sheet}/edit`}
          style={{
            borderRadius: 4,
            borderWidth: 1,
            padding: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Edit</Text>
        </Link>
        <Pressable
          style={({ pressed }) => ({
            borderRadius: 4,
            borderWidth: 1,
            padding: 8,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? "#ccc" : undefined,
          })}
          onPress={() => {
            // TODO
          }}
        >
          <Text>Share</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1, padding: 8 }}>
        <Text style={{ fontSize: 20 }}>{sampleData}</Text>
      </View>
    </>
  );
};
