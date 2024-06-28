import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack/types";

export const useModalPage = (
  options?: Partial<NativeStackNavigationOptions>,
) => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      presentation: "modal",
      ...options,
    });
  }, [navigation]);
};
