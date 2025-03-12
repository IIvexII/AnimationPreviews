import { AnimationObject } from "lottie-react-native";

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require("../assets/animations/Lottie1.json"),
    text: "Highly customizable and easy to use",
    textColor: "#410070",
    backgroundColor: "#E798F7",
  },
  {
    id: 2,
    animation: require("../assets/animations/Lottie2.json"),
    text: "Creative and innovative designs",
    textColor: "#F5A623",
    backgroundColor: "#F7FFC7",
  },
  {
    id: 3,
    animation: require("../assets/animations/Lottie3.json"),
    text: "Enjoy the experience",
    textColor: "#F15937",
    backgroundColor: "#faeb8a",
  },
];

export default data;
