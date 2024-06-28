import { Link } from "expo-router";
import { Text, View } from "react-native";

export const HomePage = () => {
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
    </View>
  );
};
