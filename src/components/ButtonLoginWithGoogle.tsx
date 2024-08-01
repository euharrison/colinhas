import { AuthError } from "firebase/auth";
import { loginWithGoogle } from "../auth/loginWithGoogle";
import { Button } from "./Button";

export const ButtonLoginWithGoogle = () => {
  return (
    <Button
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
      Entrar com Google
    </Button>
  );
};
