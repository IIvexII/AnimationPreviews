import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";

import TickerList from "./TickerList";

interface TickerProps {
  number: number;
  fontSize: number;
}

const Ticker: React.FC<TickerProps> = ({ number, fontSize: initialFontSize }) => {
  const numberList = number.toString().split("").map(Number);
  const [fontSize, setFontSize] = useState(initialFontSize);
  const [isAdjusted, setIsAdjusted] = useState(false);

  useEffect(() => {
    const adjustFontSize = () => {
      if (isAdjusted) return;

      const windowWidth = Dimensions.get("window").width;
      const requiredWidth = initialFontSize * numberList.length;

      if (requiredWidth > windowWidth) {
        const adjustedFontSize = (windowWidth / numberList.length) * 1.6;
        setFontSize(adjustedFontSize);
      }

      setIsAdjusted(true);
    };

    adjustFontSize();
  }, [numberList.length, initialFontSize, isAdjusted]);

  return (
    <View style={{ flexDirection: "row", overflow: "hidden" }}>
      {numberList.map((num, index) => (
        <TickerList key={index} number={num} fontSize={fontSize} />
      ))}
    </View>
  );
};

export default Ticker;
