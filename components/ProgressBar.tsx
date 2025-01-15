import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckCircle } from "phosphor-react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export function ProgressBar() {
  const totalLoggedSeconds = 1000;
  const dailyGoal = 5;
  const totalLoggedMinutes = 7;

  const animatedProgress = useSharedValue(0);
  const animatedThreshold = useSharedValue(0);

  const calculateThreshold = (progressRatio: number) => {
    const thresholds = [0, 0.33, 0.66, 1];
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (progressRatio >= thresholds[i]) {
        return thresholds[i];
      }
    }
    return 0;
  };

  useEffect(() => {
    const progress = Math.min(totalLoggedSeconds, dailyGoal * 60);
    const progressRatio = progress / (dailyGoal * 60);
    const calculatedWidth = progress === 0 ? 0 : Math.max(progressRatio * 100, 4);

    animatedProgress.value = withTiming(calculatedWidth, { duration: 500 });
    animatedThreshold.value = calculateThreshold(progressRatio); // Update directly here
  }, [totalLoggedSeconds, dailyGoal]);

  const animatedWidth = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value > 0 ? Math.max(animatedProgress.value, 8) : 0}%`,
    };
  });

  const animatedBackgroundColor = useAnimatedStyle(() => {
    const thresholds = [0, 0.33, 0.66, 1];
    const colors = [
      "#ef4444", // red
      "#f97316", // orange
      "#eab308", // yellow
      "#22c55e", // green
    ];

    const index = thresholds.findIndex((threshold) => animatedThreshold.value === threshold);
    const color = index !== -1 ? colors[index] : "#D1D5DB"; // fallback gray

    return { backgroundColor: color };
  });

  return (
    <View className="flex flex-col p-5 mx-4 my-2 shadow-xl border border-stone-300 rounded-xl bg-stone-100">
      <View className="flex flex-col gap-2 items-start">
        <View className="flex w-full flex-row justify-between items-center">
          <Text className="text-lg font-medium text-stone-950">Today's reading</Text>
          <Text className="text-lg font-medium text-stone-950">{((totalLoggedMinutes / dailyGoal) * 100).toFixed(0)}%</Text>
        </View>
        <View className="bg-stone-300 h-4 w-full rounded-full">
          <Animated.View style={[animatedWidth, animatedBackgroundColor]} className="h-4 rounded-full" />
        </View>
        <View className="flex-col">
          <Text className="text-base text-stone-500">{Math.floor(totalLoggedMinutes)} of {dailyGoal} min read</Text>
          {totalLoggedSeconds >= dailyGoal * 60 && (
            <View className="flex-row items-center gap-2">
              <CheckCircle size={16} weight="fill" color="#22c55e" />
              <Text className="text-base text-stone-500">Daily goal complete!</Text>
            </View>
          )}
        </View>
      </View>
      <View className="items-center mt-6">
        <TouchableOpacity className="bg-stone-950 py-4 px-6 rounded-full">
          <Text className="text-stone-50 font-medium text-lg">Continue Reading</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
