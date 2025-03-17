import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";

import Ticker from "./components/Ticker";

const TickerPage: React.FC = () => {
  const [number, setNumber] = useState(145874);

  return (
    <View style={styles.container}>
      <Ticker number={number} fontSize={100} />
      <Button
        title='Refresh'
        onPress={() => {
          setNumber(Math.floor(Math.random() * 1000000));
        }}
      />
    </View>
  );
};

export default TickerPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
