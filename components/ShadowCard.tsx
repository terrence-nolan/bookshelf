import React, { ReactNode } from "react";
import { View } from "react-native";

interface ShadowCardProps {
  childComponent: ReactNode;
}

export function ShadowCard({ childComponent }: ShadowCardProps) {
  return (
    <View className="flex flex-col p-5 m-4 shadow-md rounded-xl bg-stone-50">
      {childComponent}
    </View>
  );
}
