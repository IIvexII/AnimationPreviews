import React from "react";
import Animated, { useSharedValue } from "react-native-reanimated";
import { FlatList, Image, StatusBar, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import ListItem from "./ListItem";

import DATA from "../mock/data";
import { SPACING } from "../constants/config";

type AnimatedFlatListProps = {
  data: typeof DATA;
  style: StyleProp<ViewStyle>;
};

const AnimatedFlatList: React.FC<AnimatedFlatListProps> = ({ data, style }) => {
  const scrollY = useSharedValue(0);

  return (
    <Animated.FlatList
      data={data}
      keyExtractor={(item) => item.key}
      contentContainerStyle={style}
      onScroll={(e) => (scrollY.value = e.nativeEvent.contentOffset.y)}
      scrollEventThrottle={16}
      renderItem={({ item, index }) => {
        return <ListItem item={item} index={index} scrollY={scrollY} />;
      }}
    />
  );
};

export default AnimatedFlatList;
