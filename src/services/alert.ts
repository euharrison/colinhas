import { Alert, Platform } from "react-native";

export const alert = (
  title: string,
  message?: string,
  onConfirm?: () => Promise<void>,
) => {
  if (Platform.OS === "web") {
    if (onConfirm) {
      const result = window.prompt(
        `${title}${message ? `\n${message}` : ""}\n\nDigite "sim" para confirmar`,
        "sim",
      );
      if (result?.toLowerCase() === "sim") {
        onConfirm();
      }
    } else {
      window.alert(`${title}\n${message}`);
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
