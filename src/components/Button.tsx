import { Pressable, PressableProps, Text, TextStyle } from "react-native";
import { backgroundGray, borderGray, white } from "../theme/colors";

export const Button = ({
  children,
  style,
  textStyle,
  ...props
}: PressableProps & { textStyle?: TextStyle }) => {
  return (
    <Pressable
      {...props}
      style={(state) => [
        {
          borderWidth: 1,
          borderColor: borderGray,
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: state.pressed ? backgroundGray : white,
        },
        typeof style === "function" ? style(state) : style,
      ]}
    >
      {typeof children === "string" ? (
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            textTransform: "uppercase",
            ...textStyle,
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
