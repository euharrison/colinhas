import { Stack } from "expo-router/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../components/AuthProvider";

export default function Layout() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
