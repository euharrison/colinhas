import { ScrollView, Text, View } from "react-native";
import { Sheet } from "../database/types";
import { useFormatKey } from "../hooks/useFormatKey";
import { useFormatSheet } from "../hooks/useFormatSheet";
import { useLocalSettings } from "../hooks/useLocalSettings";
import { InstrumentIcon } from "../icons/InstrumentIcon";
import { textGray } from "../theme/colors";

export const ViewSheet = ({ sheet }: { sheet: Sheet }) => {
  const { settings } = useLocalSettings();
  const formatSheet = useFormatSheet();
  const formatKey = useFormatKey();

  const isDifferentKey = formatKey(sheet) !== sheet.key;

  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
    >
      <View style={{ marginTop: 8, marginBottom: 20, gap: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text style={{ color: textGray }}>
            Escrito para {sheet.instrument}
          </Text>
          <InstrumentIcon
            instrument={sheet.instrument}
            width={18}
            height={18}
            fill={textGray}
          />
        </View>

        {isDifferentKey && (
          <View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text style={{ color: textGray }}>
                Transposto automaticamente para {settings.instrument}
              </Text>
              <InstrumentIcon
                instrument={settings.instrument}
                width={18}
                height={18}
                fill={textGray}
              />
            </View>
          </View>
        )}

        <Text style={{ color: textGray }}>Tom: {formatKey(sheet)}</Text>
      </View>
      <Text style={{ fontSize: 20, fontWeight: "500" }}>
        {formatSheet(sheet)}
      </Text>
    </ScrollView>
  );
};
