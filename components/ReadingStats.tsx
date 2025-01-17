import React from "react";
import { RadioBar } from "./RadioBar";
import { View, Text, TouchableOpacity } from "react-native";

export function ReadingStats() {
  return (
    <>
      <View className="flex flex-col gap-2 items-start">
        <View className="flex w-full flex-row justify-between items-center mb-4">
          <Text className="text-lg font-medium text-stone-950">Reading stats</Text>
          <RadioBar selectionOptions={["W", "M", "Y", "A"]} defaultSelection="W" />
        </View>
        <View className="flex flex-row w-full justify-around">
          <View className="flex flex-col items-center">
            <Text className="text-3xl font-bold">5.2h</Text>
            <Text>Logged</Text>
          </View>
          <View className="flex flex-col items-center">
          <Text className="text-3xl font-bold">3x</Text>
            <Text>Hit daily goal</Text>
          </View>
          <View className="flex flex-col items-center">
          <Text className="text-3xl font-bold">1</Text>
            <Text>Book read</Text>
          </View>
        </View>
      </View>
      <View className="items-center mt-6">
        <TouchableOpacity className="bg-stone-300 px-4 py-2 rounded-full">
          <Text className="text-stone-950 font-medium">More</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
