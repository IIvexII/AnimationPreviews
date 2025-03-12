import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";

import Dot from "./Dot";

import { OnboardingData } from "../../../data/data";

type Props = {
  data: OnboardingData[];
  x: SharedValue<number>;
  flatlistRef: React.RefObject<Animated.FlatList<OnboardingData[]>>;
};

const Pagination = ({ data, x, flatlistRef }: Props) => {
  return (
    <View style={styles.container}>
      {data.map((_, index) => {
        return <Dot key={index} flatlistRef={flatlistRef} index={index} x={x} />;
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
});
