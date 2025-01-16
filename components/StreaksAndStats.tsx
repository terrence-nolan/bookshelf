import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export function StreaksAndStats() {
  return (
    <>
      <View className="flex flex-col gap-2 items-start">
        <View className="flex w-full flex-row justify-between items-center">
          <Text className="text-lg font-medium text-stone-950">Reading Stats</Text>
          <View className="flex flex-row gap-2 items-center">
            <TouchableOpacity className="px-3 py-1 rounded-full bg-slate-950">
              <View>
                <Text className="text-stone-50">W</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="px-3">
              <View>
                <Text>M</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="px-3">
              <View>
                <Text>Y</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}
