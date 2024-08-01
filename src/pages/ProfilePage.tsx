import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { logout } from "../auth/logout";
import { AdminSettings } from "../components/AdminSettings";
import { Header } from "../components/Header";
import { InstrumentSelector } from "../components/InstrumentSelector";
import { LoginButtons } from "../components/LoginButtons";
import { useUser } from "../hooks/useUser";
import { alert } from "../services/alert";
import { goBack } from "../services/navigation";
import { supportEmail } from "../urls";

export const ProfilePage = () => {
  const user = useUser();

  return (
    <>
      <Header title="Configurações" />
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 100,
          gap: 60,
        }}
      >
        <InstrumentSelector
          onChange={() => {
            goBack();
          }}
        />

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 20 }}>Dúvidas ou sugestões?</Text>
          <Text>
            Envie um email para:{" "}
            <Link href={`mailto:${supportEmail}`} target="_blank">
              <Text style={{ textDecorationLine: "underline" }} selectable>
                {supportEmail}
              </Text>
            </Link>
          </Text>
        </View>

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
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 20 }}>Login</Text>
            <LoginButtons />
          </View>
        )}

        <AdminSettings />
      </ScrollView>
    </>
  );
};
