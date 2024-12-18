import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { BookOpen, FloppyDisk } from 'phosphor-react-native';

// import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { CustomTextInput } from './CustomTextInput';
import UploadImageButton from './UploadImageButton';
import IconButton from './IconButton';

interface AddBookModalProps {
  isVisible: boolean;
  setIsVisible: () => void;
}

export function AddBookModal({ isVisible, setIsVisible }: AddBookModalProps) {
  const colorScheme = useColorScheme();
  const blurTint = colorScheme === 'dark' ? 'systemThickMaterialDark' : 'systemThickMaterialLight';

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <BlurView className='flex-1' tint={blurTint} intensity={70}>
            <SafeAreaView />
            <View className="flex-row justify-between pb-2 border-b">
              <TouchableOpacity onPress={() => setIsVisible()}>
                <Text className="text-xl pl-5">Cancel</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              className="flex-1 p-5 pb-10"
              keyboardDismissMode='on-drag'
              keyboardShouldPersistTaps='handled'  
            >
              <Text className="text-3xl font-bold mb-7">Add a Book</Text>
              <UploadImageButton />
              <CustomTextInput title='Title' customKeyboardType='default' />
              <CustomTextInput title='Author' customKeyboardType='default' />
              <CustomTextInput title='Publisher' customKeyboardType='default' />
              <CustomTextInput title='Year' customKeyboardType='number-pad' />
              <CustomTextInput title='Edition' customKeyboardType='default' />
              <CustomTextInput title='ISBN' customKeyboardType='number-pad' />
              <View className='flex-row gap-3 mt-4 mb-10'>
                <IconButton icon={<FloppyDisk />} title='Save' buttonColor='bg-stone-50' />
                <IconButton icon={<BookOpen />} title='Save and Open' buttonColor='bg-stone-300' />
              </View>
            </ScrollView>
          </BlurView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}
