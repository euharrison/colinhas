import { Link } from "expo-router";
import { Text, View } from "react-native";

export const SettingsPage = () => {
  return (
    <View style={{ flex: 1, padding: 8, gap: 4 }}>
      <Text>SettingsPage</Text>
      <Text>-</Text>
      <Link href="/">
        <Text>Home (voltar)</Text>
      </Link>
    </View>
  );
};
