import React from "react";
import { UserCircle } from "phosphor-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProgressBar } from "@/components/ProgressBar";
import { RecentGoalSuccess } from "@/components/RecentGoalSuccess";
import { ShadowCard } from "@/components/ShadowCard";
import { ReadingStats } from "@/components/ReadingStats";

export default function Index() {
  const { top } = useSafeAreaInsets();
  const name = "TJ"

  return (
    <View className="bg-stone-100">
      <View style={{ height: top }} />
      <View className="flex-row justify-start items-center p-4">
        <TouchableOpacity>
          <UserCircle size={32} />
        </TouchableOpacity>
      </View>
      <ScrollView className="h-full flex-col">
        <Text className="text-3xl text-stone-950 font-semibold px-4 py-2">Welcome Back, {name}!</Text>
        <ShadowCard childComponent={<ProgressBar />} />
        <ShadowCard childComponent={<RecentGoalSuccess />} />
        <ShadowCard childComponent={<ReadingStats />} />
      </ScrollView>
    </View>
  );
}
