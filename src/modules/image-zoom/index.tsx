import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const ImageZoom = () => {
  return (
    <View>
      <Image source={require("./assets/image.png")} style={[styles.image]} resizeMode='cover' />
    </View>
  );
};

export default ImageZoom;

const DIMENSIONS = Dimensions.get("window");

const styles = StyleSheet.create({
  image: {
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
  },
});
