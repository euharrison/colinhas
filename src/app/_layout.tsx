import { Stack } from "expo-router/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../components/AuthProvider";
import { DataProvider } from "../components/DataProvider";

export default function Layout() {
  return (
    <AuthProvider>
      <DataProvider>
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
      </DataProvider>
    </AuthProvider>
  );
}
