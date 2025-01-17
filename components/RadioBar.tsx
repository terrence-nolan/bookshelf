import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface RadioBarProps {
  selectionOptions: string[];
  defaultSelection: string;
}

export function RadioBar({ selectionOptions, defaultSelection }: RadioBarProps) {
  const [selected, setSelected] = useState(defaultSelection);

  return (
    <View className="flex flex-row gap-2 items-center">
      {selectionOptions.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => setSelected(option)}
          className={`px-3 py-1 rounded-full ${
            selected === option ? "bg-stone-950" : "bg-stone-200"
          }`}
        >
          <Text
            className={
              selected === option ? "text-stone-50" : "text-stone-950"
            }
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
