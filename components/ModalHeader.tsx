import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

interface ModalHeaderProps {
  setIsVisible: () => void;
  closeButtonLabel: string;
}

export function ModalHeader({ setIsVisible, closeButtonLabel }: ModalHeaderProps) {
  return (
    <View className="flex-row w-full pb-2 border-b">
      <TouchableOpacity onPress={() => setIsVisible()}>
        <Text className="text-xl pl-5">{closeButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
