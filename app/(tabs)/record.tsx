import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, AppState } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { pickerOptions } from '@/constants/pickerOptions';
import { Timer } from '../../components/Timer';

export default function Record() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const { top, bottom } = useSafeAreaInsets();

  const [dailyGoal, setDailyGoal] = useState<number>(1);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (nextAppState === 'active') {
        const running = await AsyncStorage.getItem('isRunning');
        const storedStartTime = await AsyncStorage.getItem('startTime');
        if (running === 'true' && storedStartTime) {
          const savedStartTime = new Date(JSON.parse(storedStartTime));
          const newElapsed = Math.floor((new Date().getTime() - savedStartTime.getTime()) / 1000);
          setElapsedTime(newElapsed);
          setStartTime(savedStartTime);
        }
      }
    });
  
    return () => {
      subscription.remove();
    };
  }, []);  

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  };

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
    <View style={{ paddingTop: top, paddingBottom: bottom }} className="flex-1">
    <View className="flex-1">
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
  );
}
