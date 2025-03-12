import React from "react";
import { StyleSheet, View } from "react-native";
import { SharedValue } from "react-native-reanimated";

import Dot from "./Dot";

import { OnboardingData } from "../../../data/data";

type Props = {
  data: OnboardingData[];
  x: SharedValue<number>;
};

const Pagination = ({ data, x }: Props) => {
  return (
    <View style={styles.container}>
      {data.map((_, index) => {
        return <Dot key={index} index={index} x={x} />;
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
