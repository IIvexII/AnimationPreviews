import React from "react";
import { StyleSheet, View, ViewToken } from "react-native";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import data, { OnboardingData } from "../../data/data";
import RenderItem from "./components/RenderItem";
import Pagination from "./components/Pagination";
import CustomButton from "./components/CustomButton";

const Onboarding = () => {
  const flatListRef = useAnimatedRef<Animated.FlatList<OnboardingData[]>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const viewableItemChangedHandler = ({ viewableItems }: { viewableItems: ViewToken<OnboardingData>[] }) => {
    flatListIndex.value = viewableItems[0].index!;
  };
  return (
    <>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item, index }) => <RenderItem index={index} item={item} x={x} />}
        keyExtractor={(item) => item.id.toString()}
        onScroll={scrollHandler}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={viewableItemChangedHandler}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
        <CustomButton dataLength={data.length} x={x} flatListRef={flatListRef} flatListIndex={flatListIndex} />
      </View>
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    bottom: 100,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",
    paddingHorizontal: 40,
  },
});
