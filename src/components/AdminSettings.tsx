import { Text, View } from "react-native";
import { Button } from "../components/Button";
import { observeSheetCollection } from "../database/sheets";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { useUser } from "../hooks/useUser";

const devUsers = [
  "G5gy6re3KRWCMI7rgIQoklHx3rp1", // Harri
];

export const AdminSettings = () => {
  const user = useUser();
  const { settings, updateSettings } = useLocalSettings();

  if (!user || !devUsers.includes(user.uid)) {
    return null;
  }

  return (
    <>
      <View>
        <Text>Env:</Text>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Button
            onPress={() => {
              updateSettings({ env: "prod" });
              location.href = "/";
            }}
          >
            <Text>Prod{settings.env === "prod" && " (enabled)"}</Text>
          </Button>
          <Button
            onPress={() => {
              updateSettings({ env: "dev" });
              location.href = "/";
            }}
          >
            <Text>Staging{settings.env === "dev" && " (enabled)"}</Text>
          </Button>
          <Button
            onPress={() => {
              updateSettings({ env: undefined });
              location.href = "/";
            }}
          >
            <Text>Limpar</Text>
          </Button>
        </View>
      </View>

      <View>
        <Text>Backup:</Text>
        <Button
          onPress={() => {
            const unsubscribe = observeSheetCollection(
              (data) => {
                const dataStr =
                  "data:text/json;charset=utf-8," +
                  encodeURIComponent(JSON.stringify(data, null, 2));
                const downloadAnchorNode = document.createElement("a");
                downloadAnchorNode.setAttribute("href", dataStr);
                downloadAnchorNode.setAttribute(
                  "download",
                  `sheets_${new Date().toISOString()}.json`,
                );
                downloadAnchorNode.click();
                unsubscribe();
              },
              (error) => alert(error.message),
            );
          }}
        >
          <Text>Baixar Backup</Text>
        </Button>
      </View>
    </>
  );
};
