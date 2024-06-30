import { Stack } from "expo-router/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { AccidentalProvider } from "../components/AccidentalProvider";
import { AuthProvider } from "../components/AuthProvider";
import { InstrumentProvider } from "../components/InstrumentProvider";
import { SheetsProvider } from "../components/SheetsProvider";

export default function Layout() {
  return (
    <AuthProvider>
      <SheetsProvider>
        <AccidentalProvider>
          <InstrumentProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: {
                    backgroundColor: "white",
                  },
                }}
              />
            </SafeAreaView>
          </InstrumentProvider>
        </AccidentalProvider>
      </SheetsProvider>
    </AuthProvider>
  );
}
