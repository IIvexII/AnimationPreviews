import React from "react";
import * as NavigationBar from "expo-navigation-bar";
import { Image, StatusBar, StyleSheet, View } from "react-native";

import DATA from "./mock/data";
import AnimatedFlatList from "./components/AnimatedFlatList";
import { ITEM_SIZE, SPACING } from "./constants/config";

NavigationBar.setBackgroundColorAsync("transparent");

const AnimatedFlatListPage = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Background Image */}
      <Image source={require("./assets/background.png")} style={styles.background} blurRadius={100} />

      {/* Top Bar */}
      <View style={StyleSheet.absoluteFillObject}>
        <View style={styles.topBar}>
          <Image
            source={require("./assets/menu.png")}
            resizeMode='contain'
            style={{ width: 40, height: 40, zIndex: 100 }}
          />
          <Image source={require("../../assets/images/my-image.png")} style={[styles.myAvatar, { zIndex: 100 }]} />
        </View>
      </View>

      {/* Flatlist */}
      <AnimatedFlatList style={styles.flatListStyle} data={DATA} />
    </View>
  );
};

export default AnimatedFlatListPage;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    marginTop: StatusBar?.currentHeight || 42,
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    opacity: 0.6,
  },
  myAvatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  flatListStyle: {
    marginTop: (StatusBar?.currentHeight || 42) + SPACING * 2 + 80,
    paddingHorizontal: SPACING,
    paddingBottom: SPACING + ITEM_SIZE,
  },
});
