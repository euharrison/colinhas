import { useNavigation } from "expo-router";
import { useEffect } from "react";

export const useModalPage = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ presentation: "modal" });
  }, [navigation]);
};
