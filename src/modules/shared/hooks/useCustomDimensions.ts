import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const useCustomDiemsions = () => {
  const { width, height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  return {
    width: width,
    height: height + top,
  };
};

export default useCustomDiemsions;
