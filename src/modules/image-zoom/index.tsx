import React from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import useCustomDiemsions from "../shared/hooks/useCustomDimensions";

const ImageZoom = () => {
  const { width, height } = useCustomDiemsions();
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchGestureHandler = Gesture.Pinch()
    .onChange((e) => {
      focalX.value = e.focalX;
      focalY.value = e.focalY;
      scale.value = withSpring(e.scale * 1.5, { damping: 10, stiffness: 100 });
    })
    .onEnd(() => {
      scale.value = withTiming(1);
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ],
    };
  });

  const focalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pinchGestureHandler}>
        <Animated.Image source={require("./assets/image.png")} style={[{ width, height }, rStyle]} resizeMode='cover' />
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default ImageZoom;

const styles = StyleSheet.create({
  focal: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: "red",
    borderRadius: 10,
  },
});
