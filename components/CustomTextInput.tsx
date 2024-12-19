import React from 'react';
import { KeyboardTypeOptions, Text, TextInput } from 'react-native';

interface CustomTextInputProps {
  title: string;
  customKeyboardType: KeyboardTypeOptions;
}

export function CustomTextInput({ title, customKeyboardType }: CustomTextInputProps) {
  return (
    <>
      <Text className="text-xl font-medium">{title}</Text>
      <TextInput className="text-xl bg-stone-50 border border-stone-300 rounded-xl p-3 mt-1 mb-5" keyboardType={customKeyboardType} />
    </>
  );
}
