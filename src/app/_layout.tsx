import { Stack } from "expo-router/stack";
import { AuthProvider } from "../components/AuthProvider";
import { LocalSettingsProvider } from "../components/LocalSettingsProvider";
import { OgTags } from "../components/OgTags";
import { OnboardingGate } from "../components/OnboardingGate";
import { white } from "../theme/colors";

export default function Layout() {
  return (
    <>
      <OgTags />
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
    </>
  );
}
