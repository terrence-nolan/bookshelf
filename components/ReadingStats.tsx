import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { RadioBar } from "./RadioBar";
import { readingStats } from "./__mocks__/readingStats";

export function ReadingStats() {
  const [selectedRange, setSelectedRange] = useState("Wk");

  const handleSelection = (selection: string) => {
    if (selection in readingStats) {
      setSelectedRange(selection);
    }
  };

  const currentData = readingStats[selectedRange as keyof typeof readingStats];

  return (
    <>
      <View className="flex flex-col gap-2 items-start">
        <View className="flex w-full flex-row justify-between items-center">
          <Text className="text-lg font-medium text-stone-950">Reading stats</Text>
          <RadioBar
            selectionOptions={["Wk", "Mo", "Yr", "All"]}
            defaultSelection="Wk"
            onSelect={handleSelection}
          />
        </View>
        <Text className="text-base text-stone-500 mb-2">{currentData.label}</Text>
        <View className="flex flex-row w-full justify-around">
          <View className="flex flex-col items-center">
            <Text className="text-3xl font-bold">{currentData.loggedTime}</Text>
            <Text>Logged</Text>
          </View>
          <View className="flex flex-col items-center">
            <Text className="text-3xl font-bold">{currentData.dailyGoalHits}x</Text>
            <Text>Hit daily goal</Text>
          </View>
          <View className="flex flex-col items-center">
            <Text className="text-3xl font-bold">{currentData.booksRead}</Text>
            <Text>{Number(currentData.booksRead) === 1 ? `Book` : `Books`} read</Text>
          </View>
        </View>
      </View>

      <View className="items-center mt-6">
        <TouchableOpacity className="bg-stone-200 px-6 py-2 rounded-full">
          <Text className="text-stone-950 font-medium">View Full Stats</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
