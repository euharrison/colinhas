import { Pressable, PressableProps, Text } from "react-native";
import { backgroundGray, white } from "../theme/colors";

export const Button = ({ children, ...props }: PressableProps) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => ({
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: pressed ? backgroundGray : white,
      })}
    >
      {typeof children === "string" ? (
        <Text
          style={{
            textTransform: "uppercase",
            fontSize: 12,
            fontWeight: "700",
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
