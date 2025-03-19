import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type HomeNavigationProp = NativeStackNavigationProp<RootParamList, "Home">;

const Home = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<HomeNavigationProp>();

  const pages = [
    { name: "ImageZoom", title: "🔍 Image Zoom" },
    { name: "AnimatedFlatList", title: "📜 Scrolling Animation" },
    { name: "Ticker", title: "🔢 Ticker" },
    { name: "DragBox", title: "👋 Drag Box Demo" },
    { name: "Onboarding", title: "🚀 Onboarding Demo" },
    { name: "CircularSlider", title: "🔄 Circular Slider Demo" },
  ];

  return (
    <View style={[styles.container, { paddingTop: top + 30 }]}>
      <Text style={styles.header}>Animations List</Text>
      <ScrollView>
        {pages.map((page) => (
          <Pressable key={page.name} onPress={() => navigation.navigate(page.name as keyof RootParamList)}>
            <View style={styles.tocItem}>
              <Text style={styles.tocText}>{page.title}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: "#2c3e50",
  },
  tocItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tocNumber: {
    fontSize: 18,
    fontWeight: "500",
    marginRight: 12,
    color: "#7f8c8d",
    minWidth: 28,
  },
  tocText: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
  },
});
