import React from "react";
import { View, Text } from "react-native";
import { Check, Fire } from "phosphor-react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { recentDaysReading, streakData } from './__mocks__/recentDaysReading';

export function RecentGoalSuccess() {
  const past7Days = recentDaysReading;
  const readingStreakData = streakData;

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

    return "#d6d3d1"; // fallback gray
  };

  return (
    <>
      <View className="flex flex-row justify-between items-center mb-4">
        <Text className="text-lg font-medium text-stone-950">Recent goal success</Text>
        {readingStreakData.isStreak ? (
          <View className="flex flex-row items-center">
            <Text className="text-lg font-medium text-stone-950">{readingStreakData.streakCount}</Text>
            <Fire size={16} color="#0c0a09" weight="bold" />
          </View>
        ) : (
          <></>
        )}
      </View>
      <View className="flex flex-row justify-between items-center">
        {past7Days.map((day, index) => (
          <View key={index} className="items-center">
            {day.percentage === 1 ? (
              <View
                className="rounded-full flex justify-center items-center"
                style={{
                  backgroundColor: calculateColor(day.percentage),
                  width: 32,
                  height: 32,
                }}
              >
                <Check size={20} weight="bold" color="white" />
              </View>
            ) : (
              <AnimatedCircularProgress
                size={32}
                width={4}
                fill={day.percentage * 100}
                tintColor={calculateColor(day.percentage)}
                backgroundColor="#d6d3d1"
                rotation={0}
                lineCap="round"
              />
            )}
            <Text className="text-sm text-stone-500 mt-1">{day.day}</Text>
          </View>
        ))}
      </View>
    </>
  );
}
