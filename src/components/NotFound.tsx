import { Text, View } from "react-native";
import { Header } from "./Header";

export const NotFound = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View
        style={{
          flex: 1,
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>Não encontrado 🤦</Text>
      </View>
    </View>
  );
};
