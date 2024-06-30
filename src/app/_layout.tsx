import { Stack } from "expo-router/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../components/AuthProvider";
import { DataProvider } from "../components/DataProvider";
import { InstrumentProvider } from "../components/InstrumentProvider";

export default function Layout() {
  return (
    <AuthProvider>
      <DataProvider>
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
      </DataProvider>
    </AuthProvider>
  );
}
