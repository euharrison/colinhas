import { Stack } from "expo-router/stack";
import { AccidentalProvider } from "../components/AccidentalProvider";
import { AuthProvider } from "../components/AuthProvider";
import { InstrumentProvider } from "../components/InstrumentProvider";
import { SheetsProvider } from "../components/SheetsProvider";
import { white } from "../theme/colors";

export default function Layout() {
  return (
    <AuthProvider>
      <SheetsProvider>
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
      </SheetsProvider>
    </AuthProvider>
  );
}
