import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./modules/home";
import DragBox from "./modules/drag-box";
import Onboarding from "./modules/onboarding";
import CircularSlider from "./modules/circular-slider";

const Stack = createNativeStackNavigator<RootParamList>();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='DragBox' component={DragBox} />
          <Stack.Screen name='Onboarding' component={Onboarding} />
          <Stack.Screen name='CircularSlider' component={CircularSlider} />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
