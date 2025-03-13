import { Dimensions, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { OnboardingData } from "../data/data";
import LottieView from "lottie-react-native";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = {
  index: number;
  item: OnboardingData;
  x: SharedValue<number>;
};

const RenderItem = ({ item, index, x }: Props) => {
  const circleAnimationStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [1, 4, 4],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  });
  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [200, 0, -200],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY: translateY }],
    };
  });
  return (
    <View style={[styles.container]}>
      <View style={[styles.circleContainer]}>
        <Animated.View style={[styles.circle, circleAnimationStyle, { backgroundColor: item.backgroundColor }]} />
      </View>
      <Animated.View style={[lottieAnimationStyle]}>
        <LottieView source={item.animation} style={styles.animation} autoPlay loop />
      </Animated.View>
      <Text style={[styles.text, { color: item.textColor }]}>{item.text}</Text>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 120,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  circle: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    borderRadius: SCREEN_WIDTH / 2,
  },
  animation: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.9,
  },
  text: {
    fontSize: 44,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginHorizontal: 50,
  },
});
