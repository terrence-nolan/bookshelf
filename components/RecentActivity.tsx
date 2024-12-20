import React from "react";
import { View, Text } from "react-native";
import { Check, CheckCircle } from "phosphor-react-native";

export function RecentActivity() {
  const past7Days = [
    { day: "Mon", percentage: 0.0 },
    { day: "Tue", percentage: 0.3 },
    { day: "Wed", percentage: 0.6 },
    { day: "Thu", percentage: 0.8 },
    { day: "Fri", percentage: 1.0 },
    { day: "Sat", percentage: 0.0 },
    { day: "Sun", percentage: 0.5 },
  ];

  const calculateColor = (percentage: number) => {
    if (percentage === 0) return "#d1d5db"; // gray 300 for no progress
    if (percentage >= 1) return "#15803d"; // green 700 for completed

    const thresholds = [0, 0.2, 0.4, 0.6, 0.8, 1];
    const colors = [
      "#ef4444", // red 500
      "#f97316", // orange 500
      "#f59e0b", // amber 500
      "#eab308", // yellow 500
      "#22c55e", // green 500
      "#15803d", // green 700
    ];

    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (percentage >= thresholds[i]) {
        return colors[i];
      }
    }

    return "#d1d5db"; // fallback gray 300
  };

  return (
    <View className="flex flex-col p-5 mx-4 my-6 shadow-xl border border-stone-300 rounded-xl bg-stone-100">
      <Text className="text-lg font-medium text-stone-950 mb-4">Your recent activity</Text>
      <View className="flex flex-row justify-between items-center">
        {past7Days.map((day, index) => (
          <View key={index} className="items-center">
            {day.percentage === 1 ? (
              // <CheckCircle size={40} color="#15803d" weight="fill" />
              <View
                className={'rounded-full border-2 border-transparent flex justify-center items-center'}
                style={{
                  backgroundColor: calculateColor(day.percentage),
                  width: 32,
                  height: 32,
                }}
              >
                <Check size={20} weight="bold" color="white" />
              </View>
            ) : (
              <View
                className={`rounded-full border-2 flex justify-center items-center ${
                  day.percentage === 0 ? "border-gray-300" : "border-transparent"
                }`}
                style={{
                  backgroundColor: day.percentage > 0 ? calculateColor(day.percentage) : "transparent",
                  width: 32,
                  height: 32,
                }}
              />
            )}
            <Text className="text-sm text-stone-500 mt-1">{day.day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
