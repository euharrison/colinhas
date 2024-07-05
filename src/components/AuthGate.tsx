import { ReactNode } from "react";
import { Pressable, Text } from "react-native";
import { useLoginWithGoogle } from "../hooks/useLoginWithGoogle";
import { useUser } from "../hooks/useUser";

export const AuthGate = ({ children }: { children: ReactNode }) => {
  const user = useUser();
  const loginWithGoogle = useLoginWithGoogle();

  if (user) {
    return <>{children}</>;
  }

  return (
    <>
      <Text>
        Para salvar uma nova cola é preciso criar uma conta.
        {"\n"}
        {"\n"}
        Isso é importante para você conseguir editar a cola no futuro.
      </Text>
      <Pressable
        style={{
          borderWidth: 1,
          padding: 20,
          borderRadius: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={loginWithGoogle}
      >
        <Text>Entrar com Google</Text>
      </Pressable>
    </>
  );
};
