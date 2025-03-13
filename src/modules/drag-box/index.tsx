import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const SIZE = 300;

const DragBox = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(300);
  const prevTranslateX = useSharedValue(0);
  const prevTranslateY = useSharedValue(0);

  const rotate = useSharedValue(10);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      prevTranslateX.value = translateX.value;
      prevTranslateY.value = translateY.value;
      rotate.value = withSpring(10);
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + prevTranslateX.value;
      translateY.value = event.translationY + prevTranslateY.value;
    })
    .onEnd(() => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

      if (distance < 250) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(-80);
        rotate.value = withSpring(100);
      }
    });

  const animatedSquareStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { rotate: `${rotate.value}deg` }],
    };
  });

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Image style={styles.magnetAnimation} source={require("./assets/magnet.png")} resizeMode='contain' />
        <View style={styles.magnetLine} />
        <GestureDetector gesture={panGesture}>
          <Animated.Image
            source={require("./assets/iron-man.png")}
            resizeMode={"contain"}
            style={[styles.ironMan, animatedSquareStyle]}
          />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default DragBox;

const dimensions = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  ironMan: {
    width: SIZE,
    height: SIZE,
    marginTop: SIZE - 60,
  },
  magnetAnimation: {
    position: "absolute",
    top: 40,
    left: SIZE / 2 - 60,

    width: SIZE,
    height: SIZE,
    transform: [{ rotate: "82deg" }],
  },
  magnetLine: {
    width: dimensions.width,
    height: 2,
    backgroundColor: "#BBBBBB",
    position: "absolute",
    top: dimensions.height / 2 - 52,
  },
});
