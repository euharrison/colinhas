import {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export type ControllerFeedbackRef = {
  flash: (feedback: ReactNode) => void;
};

const Feedback = ({
  children,
  onFinish,
}: {
  children: ReactNode;
  onFinish: () => void;
}) => {
  const animationValue = useRef(new Animated.Value(0));

  useEffect(() => {
    const duration = 500;

    Animated.timing(animationValue.current, {
      toValue: 1,
      duration,
      useNativeDriver: true,
      easing: Easing.in(Easing.back(1)),
    }).start();

    const timeout = setTimeout(() => onFinish(), duration);
    return () => {
      clearTimeout(timeout);
    };
  }, [onFinish]);

  return (
    <View
      pointerEvents="none"
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={{
          opacity: animationValue.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0.15, 0],
          }),
          transform: [
            {
              scale: animationValue.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.5],
              }),
            },
          ],
        }}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export const ControllerFeedback = forwardRef<ControllerFeedbackRef>(
  (_, ref) => {
    const [feedbacks, setFeedbacks] = useState<ReactNode[]>([]);

    useImperativeHandle(ref, () => ({
      flash: (children: ReactNode) => {
        const key = Date.now();
        const item = (
          <Feedback
            key={key}
            onFinish={() =>
              setFeedbacks((array) => array.filter((i) => i !== item))
            }
          >
            {children}
          </Feedback>
        );

        setFeedbacks((array) => array.concat(item));
      },
    }));

    return <>{feedbacks}</>;
  },
);
