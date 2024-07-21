import Head from "expo-router/head";
import { Stack } from "expo-router/stack";
import { AuthProvider } from "../components/AuthProvider";
import { LocalSettingsProvider } from "../components/LocalSettingsProvider";
import { OnboardingGate } from "../components/OnboardingGate";
import { white } from "../theme/colors";

export default function Layout() {
  return (
    <>
      <Head>
        <title>Colinhas</title>
        <meta
          name="description"
          content="Leia e escreva colas de músicas para tocar no carnaval de rua"
        />
      </Head>
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
