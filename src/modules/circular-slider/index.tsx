import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut, useSharedValue } from "react-native-reanimated";

import SliderItem from "./components/SliderItem";

import { IMAGES } from "./constants/data";
import { CIRCLE_RADIUS, DIMENSIONS, SPACING } from "./constants/config";

const CircularSlider = () => {
  const scrollX = useSharedValue(0);
  const [scrollIndex, setScrollIndex] = useState(0);

  const scrollHandler = (event: any) => {
    scrollX.value = event.nativeEvent.contentOffset.x / (CIRCLE_RADIUS * 2 + SPACING);
    setScrollIndex(Math.round(scrollX.value));
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        key={`image-${scrollIndex}`}
        source={IMAGES[scrollIndex]}
        style={[styles.backgroundImage]}
        entering={FadeIn.duration(500)}
        exiting={FadeOut.duration(500)}
      />
      <Animated.FlatList
        data={IMAGES}
        renderItem={({ item, index }) => <SliderItem source={item} index={index} scrollIndex={scrollX} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        decelerationRate={"fast"}
        snapToInterval={CIRCLE_RADIUS * 2 + SPACING}
        scrollEventThrottle={16} // 16ms
        onScroll={scrollHandler}
      />
    </View>
  );
};

export default CircularSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  flatList: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: DIMENSIONS.width / 2 - CIRCLE_RADIUS,
    gap: SPACING,
    marginBottom: CIRCLE_RADIUS,
  },
  backgroundImage: {
    position: "absolute",
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
    alignSelf: "center",
  },
});
