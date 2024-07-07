import { Stack } from "expo-router/stack";
import { AccidentalProvider } from "../components/AccidentalProvider";
import { AuthProvider } from "../components/AuthProvider";
import { InstrumentProvider } from "../components/InstrumentProvider";
import { white } from "../theme/colors";

export default function Layout() {
  return (
    <AuthProvider>
      <AccidentalProvider>
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
      </AccidentalProvider>
    </AuthProvider>
  );
}
