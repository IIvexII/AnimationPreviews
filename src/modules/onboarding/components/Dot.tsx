import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = {
  index: number;
  x: SharedValue<number>;
};

const Dot = ({ index, x }: Props) => {
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
  return (
    <View>
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
    </View>
  );
};

export default Dot;

const styles = StyleSheet.create({});
