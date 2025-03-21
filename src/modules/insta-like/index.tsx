import React from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";

const { width: SIZE } = Dimensions.get("window");

const InstaLike = () => {
  const heartScale = useSharedValue(0);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(250)
    .onStart(() => {
      heartScale.value = withSpring(1, {}, (isFinished) => {
        if (isFinished) heartScale.value = withDelay(200, withTiming(0));
      });
    });

  const rHeartStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartScale.value }],
    };
  });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={Gesture.Exclusive(doubleTap)}>
        <View style={styles.container}>
          <ImageBackground source={require("./assets/insta-love.png")} style={styles.image}>
            <Animated.Image source={require("./assets/heart.png")} style={[styles.heartImage, rHeartStyle]} />
          </ImageBackground>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default InstaLike;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    position: "relative",
    width: SIZE,
    height: SIZE,
  },
  heartImage: {
    width: SIZE / 2,
    height: SIZE / 2,
    position: "absolute",
    top: SIZE / 4,
    left: SIZE / 4,
  },
});
