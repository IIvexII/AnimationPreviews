import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";

import DATA from "../mock/data";
import { AVATAR_SIZE, GAP, ITEM_SIZE, PADDING, SPACING } from "../constants/config";

type ListItemProps = {
  item: (typeof DATA)[0];
  index: number;
  scrollY: SharedValue<number>;
};

const ListItem: React.FC<ListItemProps> = ({ item, index, scrollY }) => {
  const animatedListItemStyle = useAnimatedStyle(() => {
    const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)];
    const scaleInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
    return {
      opacity: interpolate(scrollY.value, opacityInputRange, [1, 1, 1, -1]),
      transform: [
        {
          scale: interpolate(scrollY.value, scaleInputRange, [1, 1, 1, -0.5]),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.listItem, animatedListItemStyle]}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={{ gap: GAP }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.jobTitle}>{item.jobTitle}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    gap: GAP,
    alignItems: "center",
    padding: PADDING,
    marginBottom: SPACING,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(109 109 109 / 0.1)",
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginRight: SPACING / 2,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  jobTitle: {
    fontSize: 16,
    color: "#828282",
  },
  email: {
    fontSize: 16,
    color: "#453EFF",
  },
});
