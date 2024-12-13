import React from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

// import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface AddBookModalProps {
  isVisible: boolean;
  setIsVisible: () => void;
}

export function AddBookModal({ isVisible, setIsVisible }: AddBookModalProps) {
  const colorScheme = useColorScheme();
  const backgroundColorStyle = {
    backgroundColor: colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  };
  

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setIsVisible()}
    >
      <View className="flex-1 p-5" style={backgroundColorStyle}>
        <View className="flex-row justify-between pb-5">
          <TouchableOpacity onPress={() => setIsVisible()}>
            <Text className="text-xl">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsVisible()}>
            <Text className="text-xl font-bold">Save</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-4xl font-bold mb-3">Add a Book</Text>
        <TextInput className="text-2xl bg-stone-200 rounded-lg p-3 my-3" placeholder="Title" />
        <TextInput className="text-2xl bg-stone-200 rounded-lg p-3 my-3" placeholder="Author" />
      
      </View>
    </Modal>
  );
}
