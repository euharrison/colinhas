import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { goBack } from "../services/navigation";
import { buttonFeedback } from "../theme/colors";
import { headerHeight } from "../theme/sizes";

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
          paddingHorizontal: 40,
        }}
      >
        <Text>{title}</Text>
        <Pressable
          style={({ pressed }) => ({
            position: "absolute",
            top: 0,
            left: 0,
            width: 40,
            height: headerHeight,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? buttonFeedback : undefined,
          })}
          onPress={() => {
            goBack();
          }}
        >
          <ArrowLeftIcon />
        </Pressable>
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 40,
            height: headerHeight,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
};
