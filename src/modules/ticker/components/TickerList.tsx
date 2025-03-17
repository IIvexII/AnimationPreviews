import React, { useEffect, useRef } from "react";
import { NativeSyntheticEvent, StyleSheet, TextLayoutEventData } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";

import Tick from "./Tick";

const numberList = Array.from({ length: 10 }, (_, i) => i);

type Props = {
  number: number;
  fontSize: number;
};

const TickerList = (props: Props) => {
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    translateY.value = withDelay(
      props.number * 20,
      withSpring(-props.fontSize * props.number, {
        damping: 20,
      })
    );
  }, [props.number, props.fontSize]);

  return (
    <Animated.View style={[animatedStyle, { height: props.fontSize }]}>
      {numberList.map((number) => (
        <Tick key={number} number={number} fontSize={props.fontSize} />
      ))}
    </Animated.View>
  );
};

export default TickerList;

const styles = StyleSheet.create({});
