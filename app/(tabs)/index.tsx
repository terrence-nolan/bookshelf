import React from "react";
import { UserCircle } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Timer } from "@/components/Timer";
import { ProgressBar } from "@/components/ProgressBar";

export default function Index() {
  const { top } = useSafeAreaInsets();
  const isStreak = true;
  const name = "TJ"
  const streak = 5;

  return (
    <>
      <View style={{ height: top }} />
      <View className="flex-row justify-end items-center px-4 pt-4">
        <TouchableOpacity>
          <UserCircle size={28} />
        </TouchableOpacity>
      </View>
      <View>
        <Text className="text-3xl text-stone-950 font-semibold">Welcome Back, {name}!</Text>
      </View>
      <ProgressBar />
      <View className='items-center my-10'>
        <TouchableOpacity
          className='bg-stone-950 py-4 px-6 rounded-full'
          // onPress={openBottomSheet}
        >
          <Text className='text-stone-50 font-medium text-lg'>Continue Reading</Text>
        </TouchableOpacity>
      </View>
      {isStreak && (
          <Text>{streak} day goal streak!</Text>
      )}
    </>
  );
}
