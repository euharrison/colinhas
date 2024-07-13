import { Pressable, PressableProps, Text } from "react-native";
import { backgroundGray, white } from "../theme/colors";

export const Button = ({ children, style, ...props }: PressableProps) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        {
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: pressed ? backgroundGray : white,
        },
        typeof style === "function" ? style({ pressed }) : style,
      ]}
    >
      {typeof children === "string" ? (
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};
