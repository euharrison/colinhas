import { Link } from "expo-router";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { useUser } from "../hooks/useUser";
import { privacyPolicyUrl, termsUrl } from "../urls";
import { Disclaimer } from "./Disclaimer";
import { LoginButtons } from "./LoginButtons";

export const AuthGate = ({ children }: { children: ReactNode }) => {
  const user = useUser();

  if (user) {
    return <>{children}</>;
  }

  return (
    <View style={{ gap: 16 }}>
      <Text>Para salvar uma nova cola é preciso criar uma conta.</Text>
      <Text>
        Isso é importante para você conseguir editar a cola no futuro.
      </Text>
      <Disclaimer>
        Ao entrar você concorda com a{" "}
        <Link href={privacyPolicyUrl} target="_blank">
          <Text style={{ textDecorationLine: "underline" }}>
            Política de privacidade
          </Text>
        </Link>{" "}
        e os
        <Link href={termsUrl} target="_blank">
          {" "}
          <Text style={{ textDecorationLine: "underline" }}>Termos de Uso</Text>
        </Link>
        .
      </Disclaimer>
      <LoginButtons />
    </View>
  );
};
