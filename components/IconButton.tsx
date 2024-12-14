import React, { useState } from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface IconButtonProps {
  icon: React.JSX.Element;
  title: string;
  buttonStyles?: string;
  textStyles?: string;
}

export default function IconButton({ icon, title, buttonStyles, textStyles }: IconButtonProps) {
  return (
    <>
      <TouchableOpacity
        className={`flex-row flex-1 items-center justify-center gap-2 bg-stone-50 border border-stone-300 rounded-xl p-3 mt-1 mb-5 ${buttonStyles}`}
      >
        {React.cloneElement(icon, { size: 18, weight: 'bold' })}
        <Text className={`text-lg ${textStyles}`}>{title}</Text>
      </TouchableOpacity>
    </>
  );
}
