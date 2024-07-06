import { forwardRef } from "react";
import { Pressable, PressableProps, View } from "react-native";
import { black, white } from "../theme/colors";
import { dropShadow } from "../theme/shadows";

export const FAB = forwardRef<View, PressableProps>((props, ref) => {
  return (
    <Pressable
      ref={ref}
      {...props}
      style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        borderColor: black,
        borderWidth: 1,
        borderRadius: 999,
        padding: 20,
        backgroundColor: white,
        ...dropShadow,
      }}
    />
  );
});
