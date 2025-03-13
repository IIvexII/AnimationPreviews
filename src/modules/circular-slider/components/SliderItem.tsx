import React from "react";
import { ImageSourcePropType, StyleSheet } from "react-native";
import Animated, { interpolate, interpolateColor, SharedValue, useAnimatedStyle } from "react-native-reanimated";

import { CIRCLE_RADIUS } from "../constants/config";

type Props = {
  source: ImageSourcePropType;
  index: number;
  scrollIndex: SharedValue<number>;
};

const SliderItem = ({ source, index, scrollIndex }: Props) => {
  const animatedSlideItemStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollIndex.value, [index - 1, index, index + 1], [CIRCLE_RADIUS, 0, CIRCLE_RADIUS]);
    const opacity = interpolate(scrollIndex.value, [index - 1, index, index + 1], [0.6, 1, 0.6]);
    const borderColor = interpolateColor(
      scrollIndex.value,
      [index - 1, index, index + 1],
      ["transparent", "white", "transparent"]
    );

    return {
      opacity: opacity,
      borderColor: borderColor,
      transform: [{ translateY: translateY }],
    };
  });
  return <Animated.Image source={source} style={[styles.circularImage, animatedSlideItemStyle]} />;
};

export default SliderItem;

const styles = StyleSheet.create({
  circularImage: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS * 2,

    borderWidth: 4,
    borderColor: "transparent",
  },
});
