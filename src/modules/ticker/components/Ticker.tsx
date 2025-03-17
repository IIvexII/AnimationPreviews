import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import TickerList from "./TickerList";

type TickerProps = {
  number: number;
  fontSize: number;
};

const Ticker = (props: TickerProps) => {
  const numberList = props.number.toString().split("").map(Number);
  const [fontSize, setFontSize] = React.useState(props.fontSize);
  const isLayoutChanged = React.useRef(false);

  const handleLayout = (event: any) => {
    if (!isLayoutChanged.current) {
      const { width } = Dimensions.get("window");

      const widthByFontSize = props.fontSize * numberList.length;
      console.log(widthByFontSize, width);

      if (widthByFontSize > width) {
        const fontSize = (width / numberList.length) * 1.6;
        setFontSize(fontSize);
      }
      isLayoutChanged.current = true;
    }
  };

  return (
    <View style={[styles.tickerContainer]} onLayout={handleLayout}>
      {numberList.map((number, index) => (
        <TickerList key={index} number={number} fontSize={fontSize} />
      ))}
    </View>
  );
};

export default Ticker;

const styles = StyleSheet.create({
  tickerContainer: {
    flexDirection: "row",
    overflow: "hidden",
  },
});
