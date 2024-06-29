import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Header } from "../components/Header";
import { getSheet } from "../database/getSheet";

export const ViewPage = () => {
  const { user, sheet } = useLocalSearchParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      const d = await getSheet(String(sheet));
      setData(d);
    };
    load();
  }, []);

  if (!data) {
    return (
      <View style={{ flex: 1, padding: 8 }}>
        <Text style={{ fontSize: 20 }}>Loading...</Text>
      </View>
    );
  }

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
      <View style={{ padding: 8 }}>
        <Text style={{ fontSize: 20 }}>Tom: {data.possible_tone}</Text>
      </View>
      <View style={{ padding: 8 }}>
        <Text style={{ fontSize: 20 }}>{data.data}</Text>
      </View>
    </>
  );
};
