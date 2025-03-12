import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Details from "./modules/details";
import Onboarding from "./modules/onboarding";

const Stack = createNativeStackNavigator<RootParamList>();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Onboarding' component={Onboarding} />
          <Stack.Screen name='Details' component={Details} />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
