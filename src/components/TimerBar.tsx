import { forwardRef, useImperativeHandle, useState } from "react";
import { View } from "react-native";
import { black } from "../theme/colors";

export type TimerBarRef = {
  update: (percent: number) => void;
};

export const TimerBar = forwardRef<TimerBarRef>((_, ref) => {
  const [percent, setPercent] = useState<number>(0);

  useImperativeHandle(ref, () => ({
    update: (percent: number) => {
      setPercent(percent);
    },
  }));

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 5,
        width: `${percent * 100}%`,
        backgroundColor: black,
        opacity: 0.2,
      }}
    />
  );
});
