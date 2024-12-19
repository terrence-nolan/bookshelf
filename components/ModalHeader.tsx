import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

interface ModalHeaderProps {
  setIsVisible: () => void;
  headerText: string;
}

export function ModalHeader({ setIsVisible, headerText }: ModalHeaderProps) {
  return (
    <View className="flex-row w-full pb-2 border-b">
      <TouchableOpacity onPress={() => setIsVisible()}>
        <Text className="text-xl pl-5">{headerText}</Text>
      </TouchableOpacity>
    </View>
  )
}
