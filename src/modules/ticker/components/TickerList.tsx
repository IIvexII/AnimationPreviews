import React, { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";

import Tick from "./Tick";
import { SpringConfig } from "react-native-reanimated/lib/typescript/animation/springUtils";

const numberList = Array.from({ length: 10 }, (_, i) => i);

interface TickerListProps {
  number: number;
  fontSize: number;
  animationDelay?: number;
  springConfig?: SpringConfig;
}

const TickerList: React.FC<TickerListProps> = ({
  number,
  fontSize,
  animationDelay = 20,
  springConfig = { damping: 20 },
}) => {
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    translateY.value = withDelay(number * animationDelay, withSpring(-fontSize * number, springConfig));
  }, [number, fontSize, animationDelay, springConfig]);

  return (
    <Animated.View style={[animatedStyle, { height: fontSize }]}>
      {numberList.map((num) => (
        <Tick key={num} number={num} fontSize={fontSize} />
      ))}
    </Animated.View>
  );
};

export default TickerList;
