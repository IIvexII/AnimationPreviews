import { Text, TextProps } from "react-native";
import React from "react";

interface TickProps extends TextProps {
  number: number;
  fontSize: number;
  lineHeightMultiplier?: number;
}

const Tick: React.FC<TickProps> = ({ number, fontSize, lineHeightMultiplier = 1.1, style, ...rest }) => {
  return (
    <Text
      style={[
        {
          fontSize,
          lineHeight: fontSize * lineHeightMultiplier,
          fontVariant: ["tabular-nums"],
          fontWeight: "900",
        },
        style,
      ]}
      {...rest}
    >
      {number}
    </Text>
  );
};

export default Tick;
