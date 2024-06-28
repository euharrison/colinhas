import { Link } from "expo-router";
import { Text, View } from "react-native";

export const ViewPage = () => {
  return (
    <View style={{ flex: 1, padding: 8, gap: 4 }}>
      <Text>ViewPage</Text>
      <Text>-</Text>
      <Link href="/">
        <Text>Home (voltar)</Text>
      </Link>
      <Link href="/harri/anunciacao/edit">
        <Text>Edit</Text>
      </Link>
    </View>
  );
};
