import { Link } from "expo-router";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { useLoginWithGoogle } from "../hooks/useLoginWithGoogle";
import { useUser } from "../hooks/useUser";
import { privacyPolicyUrl, termsUrl } from "../urls";
import { Button } from "./Button";
import { ButtonLoginWithEmail } from "./ButtonLoginWithEmail";
import { Disclaimer } from "./Disclaimer";

export const AuthGate = ({ children }: { children: ReactNode }) => {
  const user = useUser();
  const loginWithGoogle = useLoginWithGoogle();

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
      <Button onPress={loginWithGoogle}>Entrar com Google</Button>
      <ButtonLoginWithEmail />
    </View>
  );
};
