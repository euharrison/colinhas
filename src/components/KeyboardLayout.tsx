import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

export const KeyboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAvoidingView>
  );
};
