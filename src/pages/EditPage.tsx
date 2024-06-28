import { Link } from "expo-router";
import { Text, View } from "react-native";

export const EditPage = () => {
  return (
    <View style={{ flex: 1, padding: 8, gap: 4 }}>
      <Text>EditPage</Text>
      <Text>-</Text>
      <Link href="/">
        <Text>Home (voltar)</Text>
      </Link>
    </View>
  );
};
