import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ height: top }}>
        <Text>My Shelf</Text>
      </View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
