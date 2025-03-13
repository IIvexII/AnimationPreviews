import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { OnboardingData } from "../data/data";

const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = {
  dataLength: number;
  x: SharedValue<number>;
  flatListRef: React.RefObject<Animated.FlatList<OnboardingData[]>>;
  flatListIndex: SharedValue<number>;

  onPress: () => void;
};

const CustomButton = ({ x, flatListRef, flatListIndex, dataLength, onPress }: Props) => {
  const animatedButtonStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ["#410070", "#F5A623", "#F15937"]
    );

    const width = interpolate(x.value, [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH], [60, 60, 160]);
    return {
      backgroundColor: backgroundColor,
      width: width,
    };
  });

  const animatedArrowStyle = useAnimatedStyle(() => {
    const translateX = interpolate(x.value, [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH], [0, 0, 400]);
    return {
      transform: [{ translateX }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const translateX = interpolate(x.value, [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH], [-100, -100, 0], Extrapolation.CLAMP);
    const opacity = interpolate(x.value, [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH], [0, 0, 1], Extrapolation.CLAMP);
    return {
      transform: [{ translateX }],
      opacity,
    };
  });

  const onPressHandler = () => {
    if (flatListRef.current && flatListIndex.value < dataLength - 1) {
      flatListRef.current.scrollToIndex({ index: flatListIndex.value + 1 });
    } else {
      onPress();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
      <Animated.View style={[styles.button, animatedButtonStyle]}>
        <Animated.Image
          style={[styles.arrowIcon, animatedArrowStyle]}
          source={require("../assets/images/ArrowIcon.png")}
        />
        <Animated.Text style={[styles.text, animatedTextStyle]}>Get Started</Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  arrowIcon: {
    width: 30,
    height: 30,
  },
  text: {
    position: "absolute",
    color: "white",
    fontSize: 16,
  },
});
