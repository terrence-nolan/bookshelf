import React from "react";
import { RadioBar } from "./RadioBar";
import { View, Text } from "react-native";

export function ReadingStats() {
  return (
    <View className="flex flex-col gap-2 items-start">
      <View className="flex w-full flex-row justify-between items-center">
        <Text className="text-lg font-medium text-stone-950">Reading stats</Text>
        <RadioBar selectionOptions={["W", "M", "Y"]} defaultSelection="W" />
      </View>
    </View>
  )
}
