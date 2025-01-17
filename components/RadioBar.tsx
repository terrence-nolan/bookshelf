import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface RadioBarProps {
  selectionOptions: string[];
  defaultSelection: string;
  onSelect: (selection: string) => void;
}

export function RadioBar({ selectionOptions, defaultSelection, onSelect }: RadioBarProps) {
  const [selected, setSelected] = useState(defaultSelection);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
  }

  return (
    <View className="flex flex-row gap-2 items-center">
      {selectionOptions.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => handleSelect(option)}
          className={`px-3 py-1 rounded-full ${
            selected === option ? "bg-stone-950" : "bg-stone-200"
          }`}
        >
          <Text
            className={`font-medium ${
              selected === option ? "text-stone-50" : "text-stone-950"
            }`}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
