import { AuthError } from "firebase/auth";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { loginWithEmail } from "../auth/loginWithEmail";
import { ArrowForwardIcon } from "../icons/ArrowForwardIcon";
import { LoadingIcon } from "../icons/LoadingIcon";
import { alert } from "../services/alert";
import { backgroundGray, borderGray, textGray } from "../theme/colors";
import { Button } from "./Button";

enum Step {
  BUTTON,
  FORM,
  LOADING,
  COMPLETE,
}

const height = 41;

export const ButtonLoginWithEmail = () => {
  const [step, setStep] = useState(Step.BUTTON);
  const [email, setEmail] = useState("");

  if (step === Step.BUTTON) {
    return <Button onPress={() => setStep(Step.FORM)}>Entrar com email</Button>;
  }

  if (step === Step.FORM) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "stretch",
          gap: 2,
          height,
        }}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            style={{
              padding: 12,
              height: "100%",
              borderWidth: 1,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              borderColor: borderGray,
            }}
            autoFocus
            placeholder="Email"
            placeholderTextColor={textGray}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <Pressable
          style={({ pressed }) => ({
            padding: 8,
            height: "100%",
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            borderWidth: 1,
            borderColor: borderGray,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? backgroundGray : undefined,
          })}
          onPress={async () => {
            try {
              setStep(Step.LOADING);
              await loginWithEmail(email);
              setStep(Step.COMPLETE);
            } catch (error) {
              switch ((error as AuthError).code) {
                case "auth/missing-email":
                  alert("Digite seu email para de continuar");
                  break;
                case "auth/invalid-email":
                  alert("Digite um email válido antes de continuar");
                  break;
                default:
                  alert(String(error));
                  break;
              }
              setStep(Step.FORM);
            }
          }}
        >
          <ArrowForwardIcon />
        </Pressable>
      </View>
    );
  }

  if (step === Step.LOADING) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: borderGray,
          height,
        }}
      >
        <LoadingIcon width={24} height={24} />
      </View>
    );
  }

  if (step === Step.COMPLETE) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height,
        }}
      >
        <Text style={{ textAlign: "center" }}>
          Enviamos um email para você{"\n"}com um link para continuar o acesso.
        </Text>
      </View>
    );
  }

  return null;
};
