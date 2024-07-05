import { Pressable, ScrollView, Text, View } from "react-native";
import { logout } from "../auth/logout";
import { Header } from "../components/Header";
import { InstrumentSelector } from "../components/InstrumentSelector";
import { useLoginWithGoogle } from "../hooks/useLoginWithGoogle";
import { useUser } from "../hooks/useUser";
import { alert } from "../services/alert";
import { goBack } from "../services/navigation";

export const SettingsPage = () => {
  const user = useUser();
  const loginWithGoogle = useLoginWithGoogle();

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
            goBack();
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
                  alert(String(error));
                }
              }}
            >
              <Text>(Sair)</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={{ alignSelf: "flex-start" }}
            onPress={loginWithGoogle}
          >
            <Text>Entrar com Google</Text>
          </Pressable>
        )}
      </ScrollView>
    </>
  );
};
