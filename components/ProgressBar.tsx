import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckCircle } from "phosphor-react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolateColor } from "react-native-reanimated";

export function ProgressBar() {
  const totalLoggedSeconds = 200;
  const dailyGoal = 5;
  const totalLoggedMinutes = 2;

  const animatedProgress = useSharedValue(0);
  const animatedColor = useSharedValue(0);

  useEffect(() => {
    const progress = Math.min(totalLoggedSeconds, dailyGoal * 60);
    const calculatedWidth = progress === 0 ? 0 : Math.max((progress / (dailyGoal * 60)) * 100, 4);

    animatedProgress.value = withTiming(calculatedWidth, { duration: 500 });
    animatedColor.value = withTiming(calculatedWidth / 100, { duration: 500 });
  }, [totalLoggedSeconds, dailyGoal, animatedProgress, animatedColor]);

  const animatedWidth = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value > 0 ? Math.max(animatedProgress.value, 4) : 0}%`,
    };
  });

  const animatedBackgroundColor = useAnimatedStyle(() => {
    const color = interpolateColor(
      animatedColor.value,
      [0, 0.2, 0.4, 0.6, 0.8, 1],
      [
        "#ef4444", // red 500
        "#f97316", // orange 500
        "#f59e0b", // amber 500
        "#eab308", // yellow 500
        "#22c55e", // green 500
        "#15803d", // green 700
      ]
    );
    return { backgroundColor: color };
  });
  
  return (
    <View className="flex flex-col p-5 mx-4 my-2 shadow-xl border border-stone-300 rounded-xl bg-stone-100">
      {totalLoggedSeconds >= (dailyGoal * 60) ? (
        <View className='flex-row items-center gap-2 self-center'>
          <CheckCircle size={16} color={'#15803d'} weight='fill' />
          <Text className='text-base'>You've completed your {dailyGoal} min goal!</Text>
        </View>
      ) : (
        <View className='flex flex-col gap-2 items-start'>
          <View className="flex w-full flex-row justify-between items-center">
            <Text className="text-lg font-medium text-stone-950">Today's reading</Text>
            <Text className="text-lg font-medium text-stone-950">{(totalLoggedMinutes / dailyGoal) * 100}%</Text>
          </View>
          <View className='bg-stone-300 h-4 w-full rounded-full'>
          <Animated.View style={[animatedWidth, animatedBackgroundColor]} className="h-4 rounded-full" />
          </View>
          <Text className='text-sm text-stone-500'>{Math.floor(totalLoggedMinutes)} of {dailyGoal} min read</Text>
        </View>
      )}
      <View className='items-center mt-6'>
        <TouchableOpacity
          className='bg-stone-950 py-4 px-6 rounded-full'
          // onPress={openBottomSheet}
        >
          <Text className='text-stone-50 font-medium text-lg'>Continue Reading</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
