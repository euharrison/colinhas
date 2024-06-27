import { ReactNode, useEffect, useState } from "react";
import { View } from "react-native";

const getViewportHeight = () =>
  window.visualViewport?.height ?? window.innerHeight;

export const KeyboardLayout = ({ children }: { children: ReactNode }) => {
  const [maxHeight, setMaxHeight] = useState(getViewportHeight());

  useEffect(() => {
    const onResize = () => {
      setMaxHeight(getViewportHeight());
    };
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <View style={{ flex: 1, maxHeight: maxHeight }}>{children}</View>;
};
