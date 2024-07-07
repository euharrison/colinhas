import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowBackIcon } from "../icons/ArrowBackIcon";
import { goBack } from "../services/navigation";
import { headerHeight, pagePadding } from "../theme/sizes";

export const Header = ({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
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
        <Text>{title}</Text>
        <Pressable
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: headerHeight,
            paddingHorizontal: pagePadding,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            goBack();
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
