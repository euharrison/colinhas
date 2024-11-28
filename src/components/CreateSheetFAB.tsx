import { Link } from "expo-router";
import { Text, View } from "react-native";
import { FAB } from "./FAB";
import { PencilIcon } from "../icons/PencilIcon";
import { createUrl } from "../urls";

export const CreateSheetFAB = () => {
  return (
    <Link href={createUrl} asChild>
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
