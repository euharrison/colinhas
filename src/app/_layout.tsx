import { Stack } from "expo-router/stack";
import { Platform } from "react-native";
import { AuthProvider } from "../components/AuthProvider";
import { LocalSettingsProvider } from "../components/LocalSettingsProvider";
import { OnboardingGate } from "../components/OnboardingGate";
import { white } from "../theme/colors";

if (Platform.OS === "web") {
  require("../theme/globalWebStyles.css");
}

export default function Layout() {
  return (
    <AuthProvider>
      <LocalSettingsProvider>
        <OnboardingGate>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: white,
              },
            }}
          />
        </OnboardingGate>
      </LocalSettingsProvider>
    </AuthProvider>
  );
}
