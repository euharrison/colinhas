import { useWindowDimensions, View } from "react-native";
import { LoadingIcon } from "../icons/LoadingIcon";
import { backgroundGray } from "../theme/colors";

export const FileLoading = () => {
  const window = useWindowDimensions();

  return (
    <View
      style={{
        backgroundColor: backgroundGray,
        width: window.width,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingIcon />
    </View>
  );
};
