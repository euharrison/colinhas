import { Alert, Platform } from "react-native";

export const alert = (
  title: string,
  message?: string,
  onConfirm?: () => Promise<void>,
) => {
  if (Platform.OS === "web") {
    const text = `${title}${message ? `\n${message}` : ""}`;
    if (onConfirm) {
      const result = window.prompt(
        `${text}\n\nDigite "sim" para confirmar`,
        "sim",
      );
      if (result?.toLowerCase() === "sim") {
        onConfirm();
      }
    } else {
      window.alert(text);
    }
  } else {
    Alert.alert(
      title,
      message,
      onConfirm
        ? [
            {
              text: "Cancelar",
              style: "cancel",
            },
            {
              text: "Apagar",
              onPress: onConfirm,
              style: "destructive",
            },
          ]
        : undefined,
      { cancelable: true },
    );
  }
};
