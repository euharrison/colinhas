import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowBackIcon } from "../icons/ArrowBackIcon";
import { goBack } from "../services/navigation";
import { headerHeight, pagePadding } from "../theme/sizes";

export const Header = ({
  title,
  children,
  onPressBack,
}: {
  title?: string;
  children?: ReactNode;
  onPressBack?: () => void;
}) => {
  return (
    <SafeAreaView>
      <View
        style={{
          height: headerHeight,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 60,
        }}
      >
        <Text style={{ fontSize: 16, textAlign: "center" }}>{title}</Text>
        <Pressable
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: headerHeight,
            paddingHorizontal: pagePadding,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: -6,
          }}
          onPress={() => {
            if (onPressBack) {
              onPressBack();
            } else {
              goBack();
            }
          }}
        >
          <ArrowBackIcon />
        </Pressable>
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
};
