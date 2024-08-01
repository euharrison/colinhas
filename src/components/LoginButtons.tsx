import { View } from "react-native";
import { ButtonLoginWithEmail } from "./ButtonLoginWithEmail";
import { ButtonLoginWithGoogle } from "./ButtonLoginWithGoogle";

export const LoginButtons = () => {
  return (
    <View style={{ gap: 8 }}>
      <ButtonLoginWithGoogle />
      <ButtonLoginWithEmail />
    </View>
  );
};
