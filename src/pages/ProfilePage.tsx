import { Pressable, ScrollView, Text, View } from "react-native";
import { logout } from "../auth/logout";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { InstrumentSelector } from "../components/InstrumentSelector";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { useLoginWithGoogle } from "../hooks/useLoginWithGoogle";
import { useUser } from "../hooks/useUser";
import { alert } from "../services/alert";
import { goBack } from "../services/navigation";

const devUsers = [
  "G5gy6re3KRWCMI7rgIQoklHx3rp1", // Harri
];

export const ProfilePage = () => {
  const user = useUser();
  const { settings, updateSettings } = useLocalSettings();
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
              style={{ alignSelf: "flex-start", marginTop: 16 }}
              onPress={async () => {
                try {
                  await logout();
                } catch (error) {
                  alert(String(error));
                }
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  textTransform: "uppercase",
                }}
              >
                Sair
              </Text>
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

        {user && devUsers.includes(user.uid) && (
          <View>
            <Text>Env:</Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Button
                onPress={() => {
                  updateSettings({ env: "prod" });
                  location.href = "/";
                }}
              >
                <Text>Prod{settings.env === "prod" && " (enabled)"}</Text>
              </Button>
              <Button
                onPress={() => {
                  updateSettings({ env: "dev" });
                  location.href = "/";
                }}
              >
                <Text>Staging{settings.env === "dev" && " (enabled)"}</Text>
              </Button>
              <Button
                onPress={() => {
                  updateSettings({ env: undefined });
                  location.href = "/";
                }}
              >
                <Text>Limpar</Text>
              </Button>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};
