import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Audiobooks() {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View></View>
    </View>
  );
}
