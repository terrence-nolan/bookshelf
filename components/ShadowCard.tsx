import React, { ReactNode } from "react";
import { View } from "react-native";

interface ShadowCardProps {
  childComponent: ReactNode;
}

export function ShadowCard({ childComponent }: ShadowCardProps) {
  return (
    <View className="flex flex-col p-5 m-4 shadow-xl rounded-xl bg-stone-100">
      {childComponent}
    </View>
  )
}
