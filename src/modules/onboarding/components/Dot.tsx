import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { OnboardingData } from "../../../data/data";

const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = {
  index: number;
  x: SharedValue<number>;
  flatlistRef: React.RefObject<Animated.FlatList<OnboardingData[]>>;
};

const Dot = ({ index, x, flatlistRef }: Props) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const width = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [10, 20, 10],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [0.5, 1, 1],
      Extrapolation.CLAMP
    );
    return {
      width: width,
      opacity: opacity,
    };
  });

  const animatedDotColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ["#410070", "#F5A623", "#F15937"]
    );
    return {
      backgroundColor: backgroundColor,
    };
  });

  const onPressHandler = () => {
    if (flatlistRef?.current) {
      flatlistRef.current.scrollToIndex({ index: index });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={onPressHandler} hitSlop={10}>
      <Animated.View
        key={index}
        style={[
          {
            width: 10,
            height: 10,
            borderRadius: 10,
          },
          animatedDotStyle,
          animatedDotColorStyle,
        ]}
      />
    </TouchableWithoutFeedback>
  );
};

export default Dot;

const styles = StyleSheet.create({});
