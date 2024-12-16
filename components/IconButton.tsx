import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
interface IconButtonProps {
  icon: React.JSX.Element;
  title: string;
  buttonColor?: string;
  textStyles?: string;
}

export default function IconButton({ icon, title, buttonColor, textStyles }: IconButtonProps) {
  return (
    <>
      <TouchableOpacity
        className={`flex-row flex-1 items-center justify-center gap-2 border border-stone-300 rounded-xl p-3 mt-1 mb-5 ${buttonColor}`}
      >
        {React.cloneElement(icon, { size: 18, weight: 'bold' })}
        <Text className={`text-lg font-medium ${textStyles}`}>{title}</Text>
      </TouchableOpacity>
    </>
  );
}
