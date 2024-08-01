import { AuthError } from "firebase/auth";
import { Text } from "react-native";
import { loginWithGoogle } from "../auth/loginWithGoogle";
import { GoogleIcon } from "../icons/GoogleIcon";
import { Button } from "./Button";

export const ButtonLoginWithGoogle = () => {
  return (
    <Button
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 16,
        gap: 12,
        height: 42,
      }}
      onPress={async () => {
        try {
          await loginWithGoogle();
        } catch (error) {
          if ((error as AuthError).code !== "auth/popup-closed-by-user") {
            alert(String(error));
          }
        }
      }}
    >
      <GoogleIcon width={16} />
      <Text
        style={{
          fontSize: 12,
          fontWeight: "700",
          textTransform: "uppercase",
        }}
      >
        Entrar com Google
      </Text>
    </Button>
  );
};
