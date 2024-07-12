import { ReactNode } from "react";
import { Text, View } from "react-native";
import { backgroundGray, textGray } from "../theme/colors";

export const Disclaimer = ({ children }: { children: ReactNode }) => {
  return (
    <View
      style={{
        backgroundColor: backgroundGray,
        borderRadius: 4,
        padding: 16,
        paddingTop: 12,
        marginVertical: 4,
      }}
    >
      <Text style={{ color: textGray, fontStyle: "italic" }}>{children}</Text>
    </View>
  );
};
