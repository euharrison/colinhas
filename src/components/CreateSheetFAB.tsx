import { Link } from "expo-router";
import { Text, View } from "react-native";
import { PencilIcon } from "../icons/PencilIcon";
import { createSheetUrl } from "../urls";
import { FAB } from "./FAB";

export const CreateSheetFAB = () => {
  return (
    <Link href={createSheetUrl} asChild>
      <FAB>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            marginHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "700", textTransform: "uppercase" }}>
            Nova cola
          </Text>
          <PencilIcon width={18} />
        </View>
      </FAB>
    </Link>
  );
};
