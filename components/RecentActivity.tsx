import React from "react";
import { View, Text } from "react-native";
import { Check } from "phosphor-react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

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
    const thresholds = [0, 0.33, 0.66, 1];
    const colors = [
      "#ef4444", // red
      "#f97316", // orange
      "#eab308", // yellow
      "#22c55e", // green
    ];

    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (percentage >= thresholds[i]) {
        return colors[i];
      }
    }

    return "#D1D5DB"; // fallback gray
  };

  return (
    <View className="flex flex-col p-5 mx-4 my-6 shadow-xl border border-stone-300 rounded-xl bg-stone-100">
      <Text className="text-lg font-medium text-stone-950 mb-4">Your recent activity</Text>
      <View className="flex flex-row justify-between items-center">
        {past7Days.map((day, index) => (
          <View key={index} className="items-center">
            {day.percentage === 1 ? (
              // <View
              //   className="rounded-full flex justify-center items-center"
              //   style={{
              //     backgroundColor: calculateColor(day.percentage),
              //     width: 32,
              //     height: 32,
              //   }}
              // >
              //   <Check size={20} weight="bold" color="white" />
              // </View>
            <AnimatedCircularProgress
              size={32}
              width={4}
              fill={day.percentage * 100}
              tintColor={calculateColor(day.percentage)}
              backgroundColor="#D1D5DB"
              rotation={0}
            >
              {
                () => (
                  <Check size={18} weight="bold" color="#22c55e" />
                )
              }
            </AnimatedCircularProgress>
            ) : (
              <AnimatedCircularProgress
                size={32}
                width={4}
                fill={day.percentage * 100}
                tintColor={calculateColor(day.percentage)}
                backgroundColor="#D1D5DB"
                rotation={0}
                lineCap="round"
              />
            )}
            <Text className="text-sm text-stone-500 mt-1">{day.day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
