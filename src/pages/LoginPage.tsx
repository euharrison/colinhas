import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Header } from "../components/Header";
import { useModalPage } from "../hooks/useModalPage";

export const LoginPage = () => {
  useModalPage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Header title="Login" />
      <View style={{ padding: 20, gap: 16 }}>
        <View>
          <Text>Email:</Text>
          <TextInput
            style={{ padding: 8, borderWidth: 1, borderRadius: 4 }}
            autoFocus
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View>
          <Text>Senha:</Text>
          <TextInput
            style={{ padding: 8, borderWidth: 1, borderRadius: 4 }}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Pressable
          style={({ pressed }) => ({
            marginTop: 16,
            padding: 8,
            borderRadius: 4,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? "#ccc" : undefined,
          })}
          onPress={async () => {
            try {
              // TODO
            } catch (error) {
              // TODO
              console.log(error);
            }
          }}
        >
          <Text>Enviar</Text>
        </Pressable>
      </View>
    </>
  );
};
