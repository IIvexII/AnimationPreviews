import { StyleSheet, Text, TextProps, View } from "react-native";
import React from "react";

interface Props extends TextProps {
  number: number;
  fontSize: number;
}

const Tick = (props: Props) => {
  return (
    <Text
      key={props.number}
      style={{
        fontSize: props.fontSize,
        lineHeight: props.fontSize * 1.1,
        fontVariant: ["tabular-nums"],
        fontWeight: "900",
      }}
      {...props}
    >
      {props.number}
    </Text>
  );
};

export default Tick;
