import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Svg, { Circle, SvgProps } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function LoadingIcon(props: SvgProps) {
  const time = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(time.current, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const interpolate = (value: [number, number]) => {
    return time.current.interpolate({
      inputRange: [0, 1],
      outputRange: value,
    });
  };

  return (
    <Svg width={36} height={36} viewBox="0 0 30 8" {...props}>
      <AnimatedCircle
        cx={4}
        cy={4}
        r={interpolate([0, 4])}
        opacity={interpolate([0, 0.75])}
      />
      <AnimatedCircle
        cx={interpolate([4, 15])}
        cy={4}
        r={4}
        opacity={interpolate([0.75, 1])}
      />
      <AnimatedCircle
        cx={interpolate([15, 26])}
        cy={4}
        r={4}
        opacity={interpolate([1, 0.75])}
      />
      <AnimatedCircle
        cx={26}
        cy={4}
        r={interpolate([4, 0])}
        opacity={interpolate([0.75, 0])}
      />
    </Svg>
  );
}
