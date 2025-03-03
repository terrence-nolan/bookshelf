import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import { Picker } from '@react-native-picker/picker';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { pickerOptions } from '@/constants/pickerOptions';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ModalHeader } from '../../components/ModalHeader';
import { Timer } from '../../components/Timer';

interface RecordProps {
  isVisible: boolean;
  setIsVisible: () => void;
}

export default function Record({ isVisible, setIsVisible }: RecordProps) {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const { top, bottom } = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const blurTint = colorScheme === 'dark' ? 'systemThickMaterialDark' : 'systemThickMaterialLight';


  const [dailyGoal, setDailyGoal] = useState<number>(1);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  };

  useEffect(() => {
    const loadTimerState = async () => {
      const storedStartTime = await AsyncStorage.getItem('startTime');
      const storedRunning = await AsyncStorage.getItem('isRunning');

      if (storedStartTime) {
        const savedStartTime = new Date(JSON.parse(storedStartTime));
        const timeDiff = Math.floor((new Date().getTime() - savedStartTime.getTime()) / 1000);
        setElapsedTime(timeDiff);
        setStartTime(savedStartTime);
      }

      if (storedRunning !== null) setIsRunning(JSON.parse(storedRunning));
    };

    if (isVisible) {
      loadTimerState();
    }
  }, [isVisible]);

  const handleStartStop = async () => {
    if (isRunning) {
      setIsRunning(false);
      await AsyncStorage.setItem('isRunning', JSON.stringify(false));
    } else {
      const newStartTime = new Date();
      setStartTime(newStartTime);
      setIsRunning(true);
      await AsyncStorage.setItem('isRunning', JSON.stringify(true));
      await AsyncStorage.setItem('startTime', JSON.stringify(newStartTime));
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType='slide'
      transparent={true}
      onRequestClose={() => setIsVisible()}
      onDismiss={() => bottomSheetRef.current?.close()}
    >
      <BlurView className='flex-1' tint={blurTint} intensity={75}>
        <View style={{ paddingTop: top, paddingBottom: bottom }} className="flex-1">
          <View className="flex-1">
            <ModalHeader setIsVisible={setIsVisible} closeButtonLabel='Close' />

            <View className="flex-1 flex-col justify-center items-center px-5">
              <Timer
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                elapsedTime={elapsedTime}
                setElapsedTime={setElapsedTime}
                setStartTime={setStartTime}
                handleStartStop={handleStartStop}
              />
              <View className='absolute bottom-5 left-0 right-0 items-center'>
                <TouchableOpacity
                  className='bg-stone-950 py-2 px-6 rounded-full'
                  onPress={openBottomSheet}
                >
                  <Text className='text-stone-50 font-medium text-lg'>Adjust Goal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={['33%']}
            backdropComponent={(props) => (
              <BottomSheetBackdrop {...props} opacity={0.5} disappearsOnIndex={-1} appearsOnIndex={0} />
            )}
            enableHandlePanningGesture={false}
            enableContentPanningGesture={false}
          >
            <BottomSheetView
              className="bg-white p-5 flex-col justify-center items-center"
            >
              <Text className="text-xl font-medium">Set Daily Goal</Text>
              <Picker
                selectedValue={dailyGoal.toString()}
                onValueChange={(value) => setDailyGoal(Number(value))}
                style={{ height: 50, width: '100%' }}
              >
                {pickerOptions.map((value) => (
                  <Picker.Item
                    label={`${value.toString()} min/day`}
                    value={value.toString()}
                    key={value}
                  />
                ))}
              </Picker>
            </BottomSheetView>
          </BottomSheet>
        </View>
      </BlurView>
    </Modal>
  );
}
