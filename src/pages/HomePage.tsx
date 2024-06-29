import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { getSheets } from "../database/getSheets";

export const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      const d = await getSheets();
      setData(d);
    };
    load();
  }, []);

  return (
    <View style={{ flex: 1, padding: 8, gap: 4 }}>
      <Text>Home</Text>
      <Text>-</Text>
      <Link href="/login">
        <Text>Login</Text>
      </Link>
      <Text>-</Text>
      <Link href="/settings">
        <Text>Configuracoes</Text>
      </Link>
      <Text>-</Text>
      <Link href="/create">
        <Text>Nova cola</Text>
      </Link>
      <Text>-</Text>
      <Link href="/onboarding">
        <Text>Onboarding</Text>
      </Link>
      <Text>-</Text>
      {data.map((item) => (
        <Link key={item.id} href={`/harri/${item.id}`} asChild>
          <Pressable
            style={{
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 4,
              padding: 8,
            }}
          >
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
            <Text>{item.possible_tone}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
};
