import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { logout } from "../auth/logout";
import { AdminSettings } from "../components/AdminSettings";
import { Header } from "../components/Header";
import { InstrumentSelector } from "../components/InstrumentSelector";
import { useLoginWithGoogle } from "../hooks/useLoginWithGoogle";
import { useUser } from "../hooks/useUser";
import { alert } from "../services/alert";
import { goBack } from "../services/navigation";
import { supportEmail } from "../urls";

export const ProfilePage = () => {
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

        <View>
          <Text style={{ fontWeight: "700" }}>Dúvidas ou sugestões?</Text>
          <Text>
            Envie um email para:{" "}
            <Link href={`mailto:${supportEmail}`} target="_blank">
              <Text style={{ textDecorationLine: "underline" }} selectable>
                {supportEmail}
              </Text>
            </Link>
          </Text>
        </View>

        <AdminSettings />
      </ScrollView>
    </>
  );
};
