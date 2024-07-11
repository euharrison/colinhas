import { Stack } from "expo-router/stack";
import { Platform } from "react-native";
import { AuthProvider } from "../components/AuthProvider";
import { InstrumentProvider } from "../components/InstrumentProvider";
import { LocalSettingsProvider } from "../components/LocalSettingsProvider";
import { white } from "../theme/colors";

if (Platform.OS === "web") {
  require("../theme/globalWebStyles.css");
}

export default function Layout() {
  return (
    <AuthProvider>
      <LocalSettingsProvider>
        <InstrumentProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: white,
              },
            }}
          />
        </InstrumentProvider>
      </LocalSettingsProvider>
    </AuthProvider>
  );
}
