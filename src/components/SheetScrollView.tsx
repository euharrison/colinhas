import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, Text, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { ArrowDownIcon } from "../icons/ArrowDownIcon";
import { ArrowUpIcon } from "../icons/ArrowUpIcon";
import { PauseIcon } from "../icons/PauseIcon";
import { RabbitIcon } from "../icons/RabbitIcon";
import { SnailIcon } from "../icons/SnailIcon";
import {
  ControllerFeedback,
  ControllerFeedbackRef,
} from "./ControllerFeedback";
import { TimerBar, TimerBarRef } from "./TimerBar";

const tapHitArea = 0.15; // 15% of screen dimension

const pageScrollPercent = 0.8; // 80% of screen height

const tickScrollPercent = 0.2; // 20% of screen height
const tickBaseTime = 12_000; // scroll each 12s on speed 1

const maxSpeed = 4;

// speed 1 = 12s
// speed 2 = 6s
// speed 3 = 3s
// speed 4 = 1.5s
const getTimeToScroll = (speed: number) => {
  const scrollScale = 1 / Math.pow(2, speed - 1);
  return tickBaseTime * scrollScale;
};

export const SheetScrollView = ({ children }: { children: ReactNode }) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const [speed, setSpeed] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollPosRef = useRef(0);

  const scrollBy = useCallback((amount: number) => {
    scrollViewRef.current?.scrollTo({
      y: scrollPosRef.current + amount,
    });
  }, []);

  const controllerFeedbackRef = useRef<ControllerFeedbackRef>(null);
  const timerBarRef = useRef<TimerBarRef>(null);

  const timerPercentRef = useRef(0);

  useEffect(() => {
    let running = true;
    let lastNow: number;
    const timeToScroll = getTimeToScroll(speed);
    const tick = (now: number) => {
      if (lastNow === undefined) {
        lastNow = now;
      }
      if (speed) {
        const elapsed = now - lastNow;
        const increment = elapsed / timeToScroll;
        timerPercentRef.current += increment;
        if (timerPercentRef.current > 1) {
          timerPercentRef.current = 0;
          scrollBy(screenHeight * tickScrollPercent);
        }
        timerBarRef.current?.update(timerPercentRef.current);
      }
      lastNow = now;
      if (running) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
    return () => {
      running = false;
    };
  }, [speed, scrollBy, screenHeight]);

  const pageFlip = (direction: number) => {
    scrollBy(direction * screenHeight * pageScrollPercent);
    controllerFeedbackRef.current?.flash(
      direction > 0 ? (
        <ArrowDownIcon height={50} width={50} />
      ) : (
        <ArrowUpIcon height={50} width={50} />
      ),
    );
  };

  const changeSpeed = (increment: number) => {
    setSpeed((v) => {
      const newSpeed = v + increment;
      if (newSpeed < 0) {
        return 0;
      }
      if (newSpeed > maxSpeed) {
        return maxSpeed;
      }
      controllerFeedbackRef.current?.flash(
        newSpeed === 0 ? (
          <PauseIcon height={100} width={100} />
        ) : (
          <>
            {increment > 0 ? (
              <RabbitIcon height={100} width={100} />
            ) : (
              <SnailIcon height={100} width={100} />
            )}
            <Text
              style={{ textAlign: "center", fontSize: 32, fontWeight: "700" }}
            >
              {newSpeed}x
            </Text>
          </>
        ),
      );
      return newSpeed;
    });
  };

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onEnd((e) => {
      const { absoluteX: x, absoluteY: y } = e;
      const edgeX = screenWidth * tapHitArea;
      const edgeY = screenHeight * tapHitArea;
      if (y < edgeY) {
        pageFlip(-1);
      } else if (y > screenHeight - edgeY) {
        pageFlip(+1);
      } else if (x < edgeX) {
        changeSpeed(-1);
      } else if (x > screenWidth - edgeX) {
        changeSpeed(+1);
      }
    });

  const native = Gesture.Native();

  return (
    <>
      <GestureDetector
        gesture={Gesture.Exclusive(native, singleTap)}
        touchAction="pan-y"
      >
        <ScrollView
          ref={scrollViewRef}
          scrollEventThrottle={16}
          onScroll={(e) => {
            scrollPosRef.current = e.nativeEvent.contentOffset.y;
          }}
        >
          {children}
        </ScrollView>
      </GestureDetector>
      <ControllerFeedback ref={controllerFeedbackRef} />
      <TimerBar ref={timerBarRef} />
    </>
  );
};
