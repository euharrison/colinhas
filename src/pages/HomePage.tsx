import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
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
      <Link href="/settings">
        <Text>Configuracoes</Text>
      </Link>
      <Link href="/create">
        <Text>Criar cola</Text>
      </Link>
      <Link href="/harri/anunciacao">
        <Text>Cola exemplo</Text>
      </Link>
      <Link href="/onboarding">
        <Text>Onboarding</Text>
      </Link>
      <Text>-</Text>
      {data.map((item) => (
        <View key={item.id} style={{ borderWidth: 1, padding: 4 }}>
          <Text>{item.id}</Text>
          <Text>{item.name}</Text>
          <Text>{item.possible_tone}</Text>
        </View>
      ))}
    </View>
  );
};
