import { forwardRef } from "react";
import { Pressable, PressableProps, View } from "react-native";
import { black, buttonFeedback, white } from "../theme/colors";
import { dropShadow } from "../theme/shadows";

export const FAB = forwardRef<View, PressableProps>((props, ref) => {
  return (
    <Pressable
      ref={ref}
      {...props}
      style={({ pressed }) => ({
        position: "absolute",
        bottom: 20,
        right: 20,
        borderColor: black,
        borderWidth: 1,
        borderRadius: 999,
        height: 48,
        paddingHorizontal: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: pressed ? buttonFeedback : white,
        ...dropShadow,
      })}
    />
  );
});
