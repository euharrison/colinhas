import { router } from "expo-router";
import { AuthError } from "firebase/auth";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { googleLogin } from "../auth/googleLogin";
import { logout } from "../auth/logout";
import { Header } from "../components/Header";
import { InstrumentSelector } from "../components/InstrumentSelector";
import { useUser } from "../hooks/useUser";

export const SettingsPage = () => {
  const user = useUser();

  return (
    <>
      <Header title="Configurações" />
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 100,
          gap: 40,
        }}
      >
        <InstrumentSelector
          onChange={() => {
            router.back();
          }}
        />
        {user ? (
          <View>
            <Text>{user.displayName}</Text>
            <Text>{user.email}</Text>
            <Pressable
              style={{ alignSelf: "flex-start", marginTop: 10 }}
              onPress={async () => {
                try {
                  await logout();
                } catch (error) {
                  Alert.alert(String(error));
                }
              }}
            >
              <Text>(Sair)</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={{ alignSelf: "flex-start" }}
            onPress={async () => {
              try {
                await googleLogin();
              } catch (error) {
                if ((error as AuthError).code !== "auth/popup-closed-by-user") {
                  Alert.alert(String(error));
                }
              }
            }}
          >
            <Text>Entrar com Google</Text>
          </Pressable>
        )}
      </ScrollView>
    </>
  );
};
