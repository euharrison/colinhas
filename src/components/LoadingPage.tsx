import { View } from "react-native";
import { LoadingIcon } from "../icons/LoadingIcon";

export const LoadingPage = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <LoadingIcon />
    </View>
  );
};
